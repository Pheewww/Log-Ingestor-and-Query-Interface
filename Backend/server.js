const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors'); 

const app = express();



// CORS configuration to allow requests from frontend
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true, 
};

app.use(cors(corsOptions));



app.use(bodyParser.json());

// Rate Limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));



// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/logDB', { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));



const logSchema = new mongoose.Schema({
    level: String,
    message: String,
    resourceId: String,
    timestamp: Date,
    traceId: String,
    spanId: String,
    commit: String,
    metadata: {
        parentResourceId: String
    }
});
logSchema.index({ timestamp: 1, level: 1, resourceId: 1 });
const Log = mongoose.model('Log', logSchema);



// Ingestor Endpoint
app.post('/ingest', async (req, res) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).send('Expected an array of log entries');
    }

    

    try {
        await Log.insertMany(req.body);
        res.send('Log data ingested successfully');
    } catch (err) {
        res.status(500).send('Error ingesting log data: ' + err);
    }
});




//SEARCH ENDPOINT
app.get('/search', async (req, res) => {
    try {
        res.set('Cache-Control', 'no-store'); // Disable caching
        const query = buildQuery(req.query);
        const logs = await Log.find(query).exec();
        res.json(logs);
    } catch (err) {
        res.status(500).send('Error processing search: ' + err);
    }
});

function buildQuery(params) {
    let query = {};
    if (params.level) query.level = params.level;
    if (params.message) query.message = new RegExp(params.message, 'i'); // For full-text search
    if (params.resourceId) query.resourceId = params.resourceId;
    if (params.timestamp) query.timestamp = { $gte: new Date(params.timestamp) };
    if (params.traceId) query.traceId = params.traceId;
    if (params.spanId) query.spanId = params.spanId;
    if (params.commit) query.commit = params.commit;
    if (params.parentResourceId) query['metadata.parentResourceId'] = params.parentResourceId;

    return query;
}



// Start server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

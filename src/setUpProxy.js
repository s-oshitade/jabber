const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/auth/**', 
        createProxyMiddleware({ 
            target: 'http://localhost:5002'
        })
    );
    app.use('/whereby/**', 
        createProxyMiddleware({ 
            target: 'http://localhost:5002'
        })
    );
}; 
const express     = require( "express" );
const settings    = require( "./settings" );
const morgan      = require( "morgan" );
const app         = express();

//middelwares
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use(morgan("dev"));

//db connection

// routes
app.use(require("./routes/index"));
app.use("/api", require("./routes/conf/material_properties.js"));
app.use("/api", require("./routes/conf/unids.js"));
app.use("/api/ex", require("./routes/extrusion/metodo_simplificado.js"));

//starting the server
app.listen(settings.get("port"), 
          () => { console.log( `server on port ${ settings.get("port") }` ); }
);

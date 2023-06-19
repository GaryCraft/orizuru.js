# Orizuru

Fully Typed Orizuru Plugin Library.
Orizuru is a Server Library to receive Orizuru Plugin Requests.

## Example Usage

```typescript
import { Orizuru } from "@garycraft/orizuru";
import * as express from "express";

// Context is passed to all handlers to allow for state management and other such things.
const express = express();
const context = {}; // Your Context can be anything you want.

// Create an Orizuru instance and pass it the context.
const orizuru = new Orizuru(context);

// Add the Orizoru request handler to your express server.
express.post("/orizuru", orizuru.getExpressHandler());

// Add your handlers.
orizuru.addHandler("Auth", (context, data) => {
    /* Your Login Verification Logic here */
});

orizuru.addHandler("Log", (context, data) => {
    /* Your Server Log Handler here 
    This is called when the Orizuru Plugin sends a log message to the server.
    E.g. When the server starts or stops.
    */
});

// Start your server.
express.listen(3000);
```

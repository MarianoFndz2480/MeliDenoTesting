import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
  .get("/hello-world", (context) => {
    context.response.body = "Hello world!";
  })
  .post("/new-orders", async (context) => {
    const value = await context.request.body().value;
    console.log("New Order: ", value);
    if(value.topic === 'shipments') {
      const response = await fetch('http://jukebox-dev.eba-h7emp7as.us-east-1.elasticbeanstalk.com/orders/meli-hook',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });
      const data = await response.json();
      console.log("RESPONSE: ", data);
      context.response.body = data;
      context.response.status = 200
      return
    }
    context.response.body = {};
    context.response.status = 200
    return 
  })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

console.log("SERVER LISTENING...");

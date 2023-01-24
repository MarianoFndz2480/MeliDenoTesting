import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const orders = [];

const router = new Router();
router
  .get("/hello-world", (context) => {
    context.response.body = "Hello world!";
  })
  .post("/new-orders", async (context) => {
    const value = await context.request.body().value;
    console.log("New Order: ", value);
    context.response.body = value;
    orders.push(value);
  })
  .get("/orders", (context) => {
    context.response.body = orders;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

console.log("SERVER LISTENING...");

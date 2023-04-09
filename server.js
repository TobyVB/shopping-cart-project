// 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
// sk_test_51MuncbGVspIjpNnovPoTfYBUExn04TdhWAH1jJsQWywX5nmqz02PsYWdPhKdSGS1rH260Cr1L7FDqHiGLe4pAhz500a60nYm0p
// Coffee: price_1MuoziGVspIjpNnoOSyqo6ve
// Sunglassess: price_1Mup0aGVspIjpNnod79YlOIG
// Camera: price_1Mup1SGVspIjpNnoIYvVX1AS

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MuncbGVspIjpNnovPoTfYBUExn04TdhWAH1jJsQWywX5nmqz02PsYWdPhKdSGS1rH260Cr1L7FDqHiGLe4pAhz500a60nYm0p"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("listening on port 4000"));

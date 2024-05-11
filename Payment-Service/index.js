const express = require("express");
const cors = require("cors"); 
const paypal = require("paypal-rest-sdk");
const path = require("path");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AZdIKe_XMgGF-A5RHKVwF1J0M96EV0L1Ofhm5JXLfLBpNhAcpwQKH0ziReIwz5pC5z2xV7fE6tB_XM-x",
  client_secret:
    "EGNCtnhrdwzLKDuSXZh3xR8PMChdQO4g2JASIC3gba3YQ75xc8TJQft2a_mwO9bbrraEHT96JC-_5BPs",
});

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Distributed Systems",
              sku: "001",
              price: "1.00",
              currency: "USD",
              quantity: 1
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "Learn about Distributed Systems",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(500).json({ error: "Failed to create payment" });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.json({ approval_url: payment.links[i].href });
          return; // Exit the loop after sending the approval URL
        }
      }
      res.status(500).json({ error: "Approval URL not found" });
    }
  });  
});

app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1.00",
        },
      },
    ],
  };
  
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        res.status(500).json({ error: "Failed to execute payment" });
      } else {
        // Serve the success.html file upon successful payment
        res.sendFile(path.join(__dirname, "success.html"));
      }
    }
  );
});

app.get("/cancel", (req, res) => res.send("Cancelled"));

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));

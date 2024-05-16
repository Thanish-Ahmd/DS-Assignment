const express = require("express");
const cors = require("cors"); 
const paypal = require("paypal-rest-sdk");
const path = require("path");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AfOhvVjAQTBODJbuxQzUSqrTqkvGg8y23qxrElGaBhnuv_tbQZbcN13Te-HS2MW9b4oXYY_IAOfi4B1-",
  client_secret:
    "EM_ma95RALDjUCWE9AHP6o6-wHbb9wio1MQSBbnztbdYsYB-lU2A39tT1-o_h7rsn6Fxm32PFa3gTNeU",
});

const PORT = process.env.PORT || 8084;
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies
let coursePrice;

app.post("/pay", (req, res) => {
  coursePrice = req.body.coursePrice; // Get the course price from the request body
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:8084/success",
      cancel_url: "http://localhost:8084/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Distributed Systems",
              sku: "001",
              price: coursePrice,
              currency: "USD",
              quantity: 1
            },
          ],
        },
        amount: {
          currency: "USD",
          total: coursePrice,
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
          total: coursePrice,
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

import Stripe from "stripe";
import { respData } from "@/lib/resp";

export async function POST(req: Request) {
  console.log("req", req);
  console.log("request", req.body);

  const body = await req.json();
  console.log("Received payload:", body);

  const user_email = "abc@gmail.com";
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

  const session = await stripe.checkout.sessions.create({
    customer_email: user_email,
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "cad",
          product_data: {
            name: "9points credits",
          },
          unit_amount: 300,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/payment-success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/payment-canceled`,
  });

  const stripe_session_id = session.id;
  // console.log("stripe_session", session);

  return respData({
    public_key: process.env.STRIPE_PUBLIC_KEY_TEST,
    session_id: stripe_session_id,
  });
}

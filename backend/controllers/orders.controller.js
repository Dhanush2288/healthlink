const knex = require("../models/connection"); // Adjust the path as needed
// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createorder = async (req, res) => {
    const data = req.body;
 
    try {
      await knex.transaction(async (trx) => {
        // Insert order data
        const orderIds = await trx("fuel_orders").returning("order_id").insert(data);
    
        res.status(201).json({ message: "Order and delivery route created successfully", order_id: orderIds[0] });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Order and delivery route creation failed" });
    }
  };
  

const getorders = async (req, res) => {
  try {
    const order = req.query;
    const query = knex("fuel_orders");

    if (order.order_id) {
      query.where("order_id", order.order_id);
    }

    if (order.status) {
      query.where("delivery_status", order.delivery_status);
    }

    if (order.provider_id) {
      query.where("provider_id", order.provider_id);
    }

    if (order.user_id) {
      query.where("user_id", uorder.ser_id);
    }

    // Add sorting based on a specific column, e.g., 'created_at'
    query.orderBy("created_at", "desc"); // Replace 'created_at' with the column you want to sort by

    const result = await query;

    res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Api failed" });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { order_id, delivery_status, provider_id, user_id,delivery_route_loc } = req.body;

    if (!order_id) {
      return res.status(400).json({ error: "order_id is required for updating an order" });
    }

    const updatedFields = {};

    if (delivery_route_loc) {
      updatedFields.delivery_route_loc = delivery_route_loc;
    }
    if (delivery_status) {
      updatedFields.delivery_status = delivery_status;
    }

    if (provider_id) {
      updatedFields.provider_id = provider_id;
    }

    if (user_id) {
      updatedFields.user_id = user_id;
    }

    // Update the order in the database
    const updateResult = await knex("fuel_orders")
      .where("order_id", order_id)
      .update(updatedFields);

    if (updateResult === 0) {
      // No records were updated (order_id not found)
      return res.status(404).json({ error: "Order not found" });
    }

    // Fetch the updated order
    const updatedOrder = await knex("fuel_orders").where("order_id", order_id).first();

    res.status(200).json({ updatedOrder: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "API failed" });
  }
};

module.exports = {
  getorders,
  updateOrder,
};

const createFuelType = async (req, res) => {
    try {
      const data = req.body;
      const result = await knex("fuel_types").returning("id").insert(data);
      res.status(201).json({ message: "Fuel type created successfully", id: result[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fuel type creation failed" });
    }
  };

  const getFuelTypes = async (req, res) => {
    try {
      const result = await knex("fuel_types");
      res.status(200).json({ result: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "API failed" });
    }
  };
  
  const createFuelPrice = async (req, res) => {
    try {
      const data = req.body;
      const result = await knex("fuel_prices").returning("id").insert(data);
      res.status(201).json({ message: "Fuel price created successfully", id: result[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fuel price creation failed" });
    }
  };
  
  const getFuelPrices = async (req, res) => {
    try {
      var where={};
      if(req.query.price_id){
        where.price_id=req.query.price_id 
      }
      console.log(req.query)
      if(req.query.fuelType){
        where.fuel_type_id=req.query.fuelType 
      }
      const result = await knex("fuel_prices")
      .join('users', 'fuel_prices.provider_id', '=', 'users.user_id')
      .where(where)  // Replace 'yourId' with the actual ID you're looking for
      .select('fuel_prices.*', 'users.username', 'users.email');
    ;
      res.status(200).json({ result: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "API failed" });
    }
  };
  
  const createDeliveryRoute = async (req, res) => {
    try {
      const data = req.body;
      const result = await knex("delivery_routes").returning("id").insert(data);
      res.status(201).json({ message: "Delivery route created successfully", id: result[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Delivery route creation failed" });
    }
  };
  
  const getDeliveryRoutes = async (req, res) => {
    try {
      const result = await knex("delivery_routes");
      res.status(200).json({ result: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "API failed" });
    }
  };
  

module.exports = {
  createorder,
  getorders,
  createFuelType,
  getFuelTypes,
  createFuelPrice,
  getFuelPrices,
  createDeliveryRoute,
  getDeliveryRoutes,updateOrder
};

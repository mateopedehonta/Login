import { fork } from 'child_process';
import { Router } from "express";
const api = Router();

api.route("/randoms")
    .get((req,res)=>{
        let amount = req.query.cantidad;

        if (!isNaN(amount) || amount === undefined) {
          if (!amount) {
            amount = 1e8;
          }
          const forked = fork('src/routes/api/randomNumbers.js');
          forked.on('message', (result) => {
            if (result === 'ready') {
              forked.send(amount);
            } else {
              res.status(200).json({ resultado: result });
            }
          });
        }
    });

export default api;

import plans from "../../resources/data/available-plans.json";

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(plans);
    }
    else {
        res.status(405).send("Método inválido")
    }
};
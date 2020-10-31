import CSVService from "../services/csv_service";

const csvService = new CSVService();

export default class CSVController {
  async upload(req, res, next) {
    try {
      const data = req.body;
      const csv = await csvService.upload(data);
      return res.status(200).json(csv);
    } catch (err) {
      next(err);
    }
  }
}

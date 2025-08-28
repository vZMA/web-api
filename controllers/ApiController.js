// controllers/ApiController.js
import { Router } from 'express';
import Downloads from '../models/Download.js';

const router = Router();

/**
 * GET /api/v1/procedures
 * Returns:
 * [
 *   { name: "<category>", files: [
 *       { name, details, updated_at, url }
 *   ] }
 * ]
 */
router.get('/procedures', async (req, res) => {
  try {
    const downloads = await Downloads
      .find({ deletedAt: null })
      .sort({ category: 'asc', name: 'asc' })
      .lean();

    const grouped = {};

    downloads.forEach(d => {
      const category = d.category || 'Uncategorized';
      if (!grouped[category]) grouped[category] = [];

      const updatedAt = d.updatedAt
        ? new Date(d.updatedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).replace(/,/g, '')
        : '';

      // Build absolute URL using request context; fallback to https if behind proxy sets x-forwarded-proto
      const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
      const host = 'zmaartcc.org';
      const permalinkUrl = d.permalink
        ? `${proto}://${host}/files/downloads/permalink/${encodeURIComponent(d.permalink)}`
        : '';

      grouped[category].push({
        name: d.name || '',
        details: d.description || '',
        updated_at: updatedAt,
        url: permalinkUrl,
      });
    });

    const procedures = Object.keys(grouped).map(name => ({
      name,
      files: grouped[name],
    }));

    res.stdRes.data = procedures;
  } catch (e) {
    req.app.Sentry.captureException(e);
    res.stdRes.ret_det = { code: 500, message: e.message || 'Internal Server Error' };
  }

  return res.json(res.stdRes);
});

export default router;

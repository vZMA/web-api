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

      // Map raw database strings to readable category titles
    const categoryMap = {
      eloa: 'External LOAs',
      iloa: 'Internal LOAs',
      mfr: 'SOPs',
      references: 'References',
      sectorFiles: 'Sector Files',
      training: 'Training'
    };

    const grouped = {};

    downloads.forEach(d => {
      // Get readable name from map, or capitalize the raw string as a fallback
      const rawCategory = d.category || 'uncategorized';
      const category = categoryMap[rawCategory] || (rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1));
      
      if (!grouped[category]) grouped[category] = [];

      const updatedAt = d.updatedAt
        ? new Date(d.updatedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).replace(/,/g, '')
        : '';

             // Use direct file URL instead of permalink
       const fileUrl = d.fileName
         ? `https://zma-web.nyc3.digitaloceanspaces.com/downloads/${encodeURIComponent(d.fileName)}`
         : '';

       // Build permalink URL
       const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
       const host = 'zmaartcc.net';
       const permalinkUrl = d.permalink
         ? `${proto}://${host}/files/downloads/permalink/${encodeURIComponent(d.permalink)}`
         : '';

       grouped[category].push({
         name: d.name || '',
         details: d.description || '',
         updated_at: updatedAt,
         url: fileUrl,
         permalink: permalinkUrl,
       });
    });

    const procedures = Object.keys(grouped).map(name => ({
      name,
      files: grouped[name],
    }));

    res.stdRes = procedures;
  } catch (e) {
    req.app.Sentry.captureException(e);
    res.stdRes.ret_det = { code: 500, message: e.message || 'Internal Server Error' };
  }

  return res.json(res.stdRes);
});

export default router;

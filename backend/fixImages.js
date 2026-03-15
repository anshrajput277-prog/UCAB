const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const fs = require('fs');
const mongoose = require('mongoose');
const Car = require('./models/CarSchema');

// Copy images
const uploadsDir = path.join(__dirname, 'uploads');
const brain = 'C:\\Users\\ANSH\\.gemini\\antigravity\\brain\\7753f844-4334-4b21-8516-131772649d72';

try {
  fs.copyFileSync(
    path.join(brain, 'nexon_ev_1773552996625.png'),
    path.join(uploadsDir, 'nexon_ev.png')
  );
  console.log('nexon_ev.png copied - size:', fs.statSync(path.join(uploadsDir,'nexon_ev.png')).size);
} catch(e) { console.error('Copy nexon failed:', e.message); }

try {
  fs.copyFileSync(
    path.join(brain, 'hyundai_creta_1773553018494.png'),
    path.join(uploadsDir, 'hyundai_creta.png')
  );
  console.log('hyundai_creta.png copied - size:', fs.statSync(path.join(uploadsDir,'hyundai_creta.png')).size);
} catch(e) { console.error('Copy creta failed:', e.message); }

// Update DB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('DB connected');
    const r1 = await Car.updateOne({ carname: 'Tata Nexon EV' }, { $set: { carImage: 'nexon_ev.png' } });
    console.log('Nexon EV updated:', r1.modifiedCount);
    const r2 = await Car.updateOne({ carname: 'Hyundai Creta' }, { $set: { carImage: 'hyundai_creta.png' } });
    console.log('Hyundai Creta updated:', r2.modifiedCount);
    fs.writeFileSync('fix_result.txt', 'SUCCESS: Nexon=' + r1.modifiedCount + ' Creta=' + r2.modifiedCount);
    await mongoose.connection.close();
    console.log('Done!');
  })
  .catch(e => {
    console.error('DB error:', e.message);
    fs.writeFileSync('fix_result.txt', 'DB_ERROR: ' + e.message);
    process.exit(1);
  });

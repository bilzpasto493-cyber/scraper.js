const { chromium } = require('playwright');

(async () => {
  console.log('Menyalakan browser di server GitHub...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    console.log('Membuka web Hinatasoft...');
    await page.goto('https://smm.hinatasoft.com/', { waitUntil: 'networkidle' });

    console.log('Memilih layanan...');
    // Kode ini nyari elemen select buat milih layanan (misal Instagram Followers)
    // Lo harus sesuaikan selector ini dengan struktur web aslinya
    await page.selectOption('select[name="service"]', { label: 'Instagram Followers Buzzer Indonesia' }); // Ganti label ini
    
    console.log('Mengisi link target...');
    await page.fill('input[name="target"]', 'https://instagram.com/username'); // Ganti dengan link target lo

    console.log('Mengisi jumlah...');
    await page.fill('input[name="quantity"]', '100'); // Ganti sesuai jumlah

    console.log('Klik Order...');
    // await page.click('button[type="submit"]'); // Uncomment ini kalau form udah bener

    console.log('Berhasil masuk ke form order.');
    // Kalau mau liat screenshot hasilnya, uncomment baris di bawah
    // await page.screenshot({ path: 'hasil.png' });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();

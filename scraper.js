const { chromium } = require('playwright');

(async () => {
  console.log('Menyalakan browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    console.log('Membuka web Hinatasoft...');
    await page.goto('https://smm.hinatasoft.com/#pesan', { waitUntil: 'networkidle' });

    // 1. Klik tombol "Pilih layanan" di halaman depan
    console.log('Membuka form order...');
    await page.click('text=Pilih layanan');
    await page.waitForTimeout(2000);

    // 2. Pilih Layanan (Klik dropdown lalu pilih opsi)
    console.log('Memilih layanan...');
    // Klik dropdown buat buka list
    await page.click('text=Layanan'); 
    await page.waitForTimeout(1000);
    // Ketik nama layanan biar muncul
    await page.keyboard.type('Tayangan Video Instagram [ Maksimum Tak Terbatas ]');
    await page.waitForTimeout(1000);
    // Tekan Enter buat milih
    await page.keyboard.press('Enter');
    
    // 3. Isi Link Target
    console.log('Mengisi link target...');
    // Gua pake link palsu dulu buat tes
    await page.fill('input[placeholder*="https://www.instagram.com"]', 'https://www.instagram.com/reel/test123/'); 

    // 4. Isi Jumlah
    console.log('Mengisi jumlah...');
    await page.fill('input[type="number"]', '15000'); 

    // 5. Isi Kontak
    console.log('Mengisi kontak...');
    await page.fill('input[placeholder*="WhatsApp"]', '08123456789'); 

    // 6. Klik Lihat Ringkasan
    console.log('Klik Lihat Ringkasan...');
    await page.click('text=Lihat ringkasan');
    await page.waitForTimeout(3000); 

    // 7. Klik Buat Invoice QRIS
    console.log('Membuat invoice QRIS...');
    await page.click('text=Buat invoice QRIS');
    await page.waitForTimeout(3000); 

    // 8. Screenshot hasilnya
    await page.screenshot({ path: 'invoice.png' });
    console.log('Berhasil! QRIS udah jadi. Cek tab Artifacts.');

  } catch (error) {
    console.error('Error:', error.message);
    // Screenshot kalau error
    await page.screenshot({ path: 'error.png' });
  } finally {
    await browser.close();
  }
})();

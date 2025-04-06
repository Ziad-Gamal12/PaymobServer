const http = require('http'); // استدعاء وحدة HTTP لإنشاء خادم
const fs = require('fs'); // استدعاء وحدة FS لقراءة الملفات

// إنشاء الخادم
const server = http.createServer((req, res) => {
  console.log(`طلب وارد: ${req.url}`); // طباعة عنوان الصفحة المطلوبة في سطر الأوامر

  if (req.url === '/') {
    // طلب الصفحة الرئيسية
    res.writeHead(200, { 'Content-Type': 'text/html' }); // تحديد نوع المحتوى كـ HTML
    res.end('<h1>مرحبًا بك في صفحتنا الرئيسية!</h1>'); // إرسال محتوى HTML
  } 
  else if (req.url === '/about') {
    const aboutInfo = {
        title: 'من نحن',
        description: 'هذا الموقع هو مثال على خادم Node.js.',
        contact: 'contact@example.com'
      };
  
      // تحويل الكائن إلى سلسلة JSON
      const jsonResponse = JSON.stringify(aboutInfo);
  
      // إعداد ترويسة الاستجابة لتحديد نوع المحتوى كـ JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
  
      // إرسال الاستجابة مع بيانات JSON
      res.end(jsonResponse);
  } 
  else if (req.url === '/contact') {
    // طلب صفحة "اتصل بنا"
    fs.readFile('contact.html', (err, data) => { // قراءة الملف contact.html
      if (err) {
        res.writeHead(500, { 'Content-Type': '' });
        res.end('حدث خطأ في قراءة الملف');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data); // إرسال محتوى الملف كاستجابة
      }
    });
  } 
  else {
    // أي صفحة غير موجودة
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - الصفحة غير موجودة</h1>');
  }
});

// تشغيل الخادم على المنفذ 3000
server.listen(3000, () => {
  console.log('الخادم يعمل على http://localhost:3000');
});

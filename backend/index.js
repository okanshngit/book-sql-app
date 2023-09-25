const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// CORS middleware kullanımı
app.use(cors());
const port = 3000;
// JSON verilerini işlemek için middleware ekleme
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost', // Veritabanı sunucusunun adresi
    user: 'root', // Kullanıcı adı
    password: '12345', // Şifre
    database: 'test', // Veritabanı adı
});

app.get('/api/books', (req, res) => {
    // Veritabanından verileri almak için sorguları çalıştırın
    db.query('SELECT * FROM test.books', (err, data) => {
        if (err) {
            console.error('Sorgu hatası:', err);
            res.status(500).send('Veri alınamadı');
            return;
        }
        // Verileri istemciye gönderin
        res.json(data);
    });
});

app.post('/books', (req, res) => {

    const { title, description, cover } = req.body;

    const insertQuery = 'INSERT INTO books (title, description, cover) VALUES (?, ?, ?)';
    const values = [title, description, cover];

    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Ekleme hatası:', err);
            res.status(500).send('Veri eklenemedi',);
            return res.json("Ekleme başarı ile gerçekleşti");
        }
        return res.json(result)

    })
})

// Kitap Silme Endpoint'i
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    console.log("Backend", bookId)

    db.query('DELETE FROM books WHERE idbooks = ?', [bookId], (error, result) => {
        if (error) {
            console.error('Kitap silinirken hata oluştu:', error);
            res.status(500).json({ message: 'Kitap silinirken hata oluştu' });
        } else {
            console.log('Kitap başarıyla silindi.');
            res.status(200).json({ message: 'Kitap başarıyla silindi' });
        }
    });
});

// Kitap Güncelleme Endpoint'i
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE idbooks = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];


    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});


app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});



const http = require('http'); //получаем модуль http, который необходим для создания сервера. Это встроенный модуль, и для его загрузки необходимо применить функцию require():
const PORT = require('./config/port');

const app = require('./app'); //Для загрузки модулей применяется функция require(), в которую передается название модуля. 
// const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db')
//Mongoose представляет специальную ODM-библиотеку (Object Data Modelling) для работы с MongoDB, которая позволяет сопоставлять объекты классов и документы коллекций из базы данных
const mongoose = require('mongoose');
//В отличие от таблиц в реляционных системах, где все данные хранятся в виде строк, в коллекциях в MongoDB данные хранятся в виде документов

mongoose.connect(db.url); // здесь будет наша коллекция
//Для подключения к  базе данных mongodb применяется метод connect():
/*Метод connect принимает два параметра:
Адрес сервера. В качестве протокола адреса устанавливается "mongodb://". На локальной машине адресом будет localhost, после которого указывается номер порта. По умолчанию номер порта 27017.
Второй параметр представляет функцию обратного вызова, которая срабатывает при установке подключения. Это функция принимает два параметра: err (возникшая ошибка при установке соединения) и client (ссылка на подключенный к серверу клиент).
Если при подключении возникли ошибки, то мы можем использовать значение err для получения ошибки.
Если же ошибки нет, то мы можем взаимодействовать с сервером через объект client.
В конце завершения работы с бд нам надо закрыть соединение с помощью метода client.close().*/

http.createServer(app).listen(PORT.PORT, console.log("Server started successfully at port" + PORT.PORT)); //получаем модуль http, который необходим для создания сервера. Это встроенный модуль, и для его загрузки необходимо применить функцию require():

//Этот метод принимает три параметра. Первый параметр указывает на локальный порт, по которому запускается сервер. Второй параметр указывает на локальный адрес. То есть в данном случае сервер будет запускаться по адресу 127.0.0.1 или localhost на порту 3000.

//Третий параметр представляет функцию, которая запускается при начале прослушивания подключений. Здесь эта функция просто выводит диагностическое сообщение на консоль.

//Node.js использует модульную систему. То есть вся встроенная функциональность разбита на отдельные пакеты или модули. Модуль представляет блок кода, который может использоваться повторно в других модулях.
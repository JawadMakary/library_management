db.Books.insertOne({
  "BookId":1,
  "ISBN":2,
  "BookName":"first book",
  "Author":"first author",
  "Gender":"Male",
  "Status":"available",
  "Date":new Date(Date.now())
  
})

db.Staff.insertOne({
 "FirstName":"jawad",
"LastName":"makary",
"Gender":"male",
"DateOfBirth":new Date("1999-10-04"),
"Role":"admin",
"salary":10000
})
db.Customers.insertOne({
 "FirstName":"jad",
"LastName":"makary",
"PhoneNumber":"+96176348376",
"Email":"jad@gmail.com",
"BorrowedBookList":"first book"
})
db.BorrowedBooks.insertOne({
"borrowerID":1,
"borrowedBookName":"first book",
"borrowedBookID":1,
"borrowedBookDate":
new Date("2022-1-1")})
const express = require("express");
const bodyParser = require("body-parser");
const exp = require("constants");
const sendMail = require("./sendMail");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.post("/", async (req, res) => {
    const formData = req.body;

    const fullName = formData["full-name"];
    const dob = formData["dob"];
    const gender = formData["gender"];
    const phone = formData["phone"];
    const email = formData["email"];
    const appointmentDate = formData["appointment_date"];
    const reason = formData["reason"];

    console.log('Form Data:', {
        fullName,
        dob,
        gender,
        phone,
        email,
        appointmentDate,
        reason
    });

    try {
        await sendMail(email, formData);
        res.redirect("thankyou.html");
    } catch (error) {
        console.error("Error processing form:", error);
        res.status(500).send("An error occurred while processing the form.");
    
    }

});

app.listen(port, ()=>{
    console.log(`Server running at https://localhost:${port}`);
})
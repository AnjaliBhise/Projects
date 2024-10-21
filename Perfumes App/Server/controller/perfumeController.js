const express = require("express");
const fs = require("fs");
const path = require("path");
const Perfume = require("../model/perfumeModel"); 

// Path to the folder where your images are stored
 const imagesFolder = path.join(__dirname, "../images"); 

// Function to convert image to base64
const getBase64Image = (filePath) => {
    const image = fs.readFileSync(filePath); 
    return `data:image/jpg;base64,${image.toString('base64')}`; // Convert to base64
};

// Controller function to upload multiple perfumes
const add = async (req, res) => {
    const perfumesData = [
        {
            name: "Aqua di Gioia",
            price: 70.99,
            description:"A refreshing blend of jasmine and rose.",
            details: "Aqua di Gioia is a fresh, aquatic fragrance inspired by the Mediterranean sea. The scent opens with invigorating top notes of mint and lemon, which are followed by a delicate heart of jasmine and peony. Its base notes of cedar and sugar provide a long-lasting, sweet finish. This light and refreshing perfume is perfect for warm summer days, offering a cool and calming aroma that feels like a sea breeze.A fresh, aquatic fragrance inspired by the essence of the Mediterranean sea. Its top notes of mint and lemon are balanced by a heart of jasmine and peony, while the base notes of cedar and sugar make it a long-lasting scent perfect for summer days.",
            sizes: ["30ml", "50ml", "100ml"],
            cardImage:getBase64Image(path.join(imagesFolder, "perfume2.png")),
            reviews:[
                "A perfect summer fragrance! It’s light, fresh, and lasts all day.",
                "Absolutely love the blend of mint and jasmine. It's my go-to daily perfume.",
                "So refreshing and clean, it reminds me of a beach vacation.",
                "The lemon and peony notes are so calming, I wear it every day."
              ],
              gallery: [
                getBase64Image(path.join(imagesFolder, "aqua1.jpg")),
                getBase64Image(path.join(imagesFolder, "aqua2.jpg")),
                getBase64Image(path.join(imagesFolder, "aqua3.jpg"))
            ]
        },
        {
            name: "Coco Chanel",
            price: 125.50,
            description:"A mysterious scent with hints of sandalwood.",
            details: "Coco Chanel is the epitome of sophistication and elegance, blending floral notes of jasmine and rose with a touch of warm vanilla. This timeless fragrance is designed for the confident woman who appreciates luxury and refinement. The complex scent is perfect for evening wear, leaving a lasting impression with its warm and inviting aroma. It's a scent that exudes class and is ideal for special occasions.",
            sizes: ["50ml", "100ml"],
            cardImage:getBase64Image(path.join(imagesFolder, "gallery5.png")),
            reviews:[
                "Timeless and elegant! I get compliments every time I wear it.",
                "The vanilla undertones make it perfect for an evening out. Definitely worth the price!",
                "Chic and sophisticated. It’s a fragrance that stands out in a crowd.",
                "Lasts for hours! I feel so classy whenever I wear it."
              ],
              gallery: [
                getBase64Image(path.join(imagesFolder, "coco1.jpg")),
                getBase64Image(path.join(imagesFolder, "coco2.jpg")),
                getBase64Image(path.join(imagesFolder, "coco3.jpg"))
            ]
        },
        {
            name: "Seoul",
            price: 55.75,
            description:"Experience the coolness of the ocean in a bottle.",
            details: "Seoul is a vibrant and exotic fragrance that captures the dynamic energy of its namesake city. With refreshing top notes of citrus and floral hints, this scent is both uplifting and lively. Its base notes provide a warm, long-lasting finish that makes it suitable for any occasion. Whether you're spending a day in the city or enjoying a night out, Seoul is the perfect fragrance for those who want to stand out with a unique and bold scent.",
            sizes: ["30ml", "60ml", "90ml"],
            cardImage:getBase64Image(path.join(imagesFolder, "gallery7.png")),
            reviews:[
                "I love how refreshing and vibrant it is. It truly captures the energy of the city.",
                "Citrusy and floral with a warm finish – perfect for any occasion.",
                "A very unique scent. It’s bold yet subtle, perfect for everyday use.",
                "This perfume reminds me of springtime. It's fresh and light."
              ],
            gallery: [
                getBase64Image(path.join(imagesFolder, "seoul1.jpg")),
                getBase64Image(path.join(imagesFolder, "seoul2.jpg")),
                getBase64Image(path.join(imagesFolder, "seoul3.jpg"))
            ]
        },
        {
            name: "Possess",
            price: 80.00,
            description:"A warm and cozy fragrance with vanilla undertones.",
            details: "Possess is an alluring fragrance with rich notes of amber and musk, designed for those who want to make a bold statement. The scent is warm and cozy, perfect for evening wear or special occasions where you want to leave a lasting impression. With its deep and sensual aroma, Possess is a luxurious perfume that envelops you in sophistication and confidence. The alluring combination of amber and musk creates a truly captivating experience.",
            sizes: ["50ml", "100ml"],
            cardImage:getBase64Image(path.join(imagesFolder, "perfume1.png")),
            reviews:[
                "This scent is bold and lasts a long time. The amber and musk notes are amazing!",
                "It's my signature evening perfume now. Warm, cozy, and very sensual.",
                "Love the rich, deep notes of this fragrance. Perfect for a night out.",
                "The scent is so luxurious, and I get asked about it all the time."
              ],
            gallery: [
                getBase64Image(path.join(imagesFolder, "possess1.jpg")),
                getBase64Image(path.join(imagesFolder, "possess2.jpg")),
                getBase64Image(path.join(imagesFolder, "possess3.jpg"))
            ]
        },
        {
            name: "Dior",
            price: 145.25,
            description:"An enchanting scent with lavender and musk.",
            details: "Dior is a modern classic, blending elegant floral notes with fresh citrus to create a sophisticated and enchanting fragrance. The top notes offer a refreshing burst of citrus, while the heart of lavender and a base of musk give it a rich, deep character. This versatile perfume transitions effortlessly from day to night, making it perfect for any occasion. Its refined scent makes it ideal for individuals who appreciate understated luxury and elegance.",
            sizes: ["50ml", "100ml"],
            cardImage:getBase64Image(path.join(imagesFolder, "perfume4.png")),
            reviews:[
                "A classic scent that never disappoints. Lavender and musk make it so elegant.",
                "Perfect balance of citrus and floral notes. It's luxurious!",
                "It’s a modern classic, transitions beautifully from day to night.",
                "The scent is enchanting. It’s both fresh and deep, one of my favorites."
              ],
              gallery: [
                getBase64Image(path.join(imagesFolder, "dior1.jpg")),
                getBase64Image(path.join(imagesFolder, "dior2.jpg")),
                getBase64Image(path.join(imagesFolder, "dior3.jpg"))
            ]
        },
        {
            name: "Givenchy Gentleman",
            price: 110.99,
            description:"A zesty blend of lemon and orange for a fresh start.",
            details: "Givenchy Gentleman is a woody, aromatic fragrance that embodies the essence of masculinity. With top notes of zesty lemon and orange, the fragrance opens with a refreshing and invigorating burst. The heart features the calming scent of lavender, while the base of patchouli adds depth and sophistication. This bold yet elegant scent is perfect for the modern gentleman who values timeless, classic elegance. Whether for day or night, this fragrance stands out as a symbol of refined masculinity.",
            sizes: ["50ml", "100ml", "150ml"],
            cardImage:getBase64Image(path.join(imagesFolder, "perfume6.png")),
            reviews:[
                "A truly masculine scent. The patchouli and lavender combo is fantastic.",
                "Elegant yet bold. I wear it to all formal events and always get compliments.",
                "It’s a great fragrance for both day and night, very versatile.",
                "A timeless classic. This scent feels strong and refined."
              ],
              gallery: [
                getBase64Image(path.join(imagesFolder, "givenchy1.jpg")),
                getBase64Image(path.join(imagesFolder, "givenchy2.jpg")),
                getBase64Image(path.join(imagesFolder, "givenchy3.jpg"))
            ]
        }

    ];

    try {
        await Perfume.insertMany(perfumesData);
        res.status(200).send("Perfumes uploaded successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving perfumes");
    } 
};

const fetch = async (req, res) => {
    try {
        const perfumes = await Perfume.find();
        if (perfumes.length === 0) {
            return res.status(404).json({ message: "Perfumes not found." });
        }
        res.status(200).json(perfumes);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

const fetchById = async (req, res) => {
    try {
        const perfume = await Perfume.findById(req.params.id);
        if (!perfume) {
            return res.status(404).json({ message: "Perfume not found." });
        }
        res.status(200).json(perfume);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// Adding this function to handle review submission
const submitReview = async (req, res) => {
    const { id } = req.params; 
    const { review } = req.body; 
    if (!review || typeof review !== 'string') {
        return res.status(400).json({ message: "Invalid review." });
    }

    try {
        
        const updatedPerfume = await Perfume.findByIdAndUpdate(
            id,
            { $push: { reviews: review } }, 
            { new: true } 
        );

        if (!updatedPerfume) {
            return res.status(404).json({ message: "Perfume not found." });
        }

        res.status(200).json(updatedPerfume); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};



module.exports = {
    add,
    fetch,
    fetchById,
    submitReview
}

const response = require('../utils/response');
const { timeAgo } = require('../utils/timeDifference');
const models = require('../models');
const { Op } = require('sequelize');


const signin = async (req, res) => {
    try {
        res.render('signin', {
            title: 'Sign in'
        });
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const sendOtp = async (req, res) => {
    try {
        res.render('sendOtp', {
            title: 'Send Otp',
            backUrl: '/',
            proceedUrl: '/next-page',
            countryCodes: ['+91'],
            phoneNumber: ''
        });
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const verifyOtp = async (req, res) => {
    try {
        const findUser = await models.user.findByPk(req.session.current_user);
        res.render('verifyOtp', {
            title: 'Verify Otp',
            backUrl: '/signin',
            resendUrl: '/resend-otp',
            proceedUrl: '/proceed',
            phoneNumber: findUser.phone_number
        });
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const createPet = async (req, res) => {
    try {
        res.render('createPet', {
            title: 'Pet details',
        });
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const createOwner = async (req, res) => {
    try {
        res.render('createOwner', {
            title: 'Owner details',
        });
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const home = async (req, res) => {
    try {
        const userId = req.session.current_user;
        // const userId = req.query.user_id;
        // if (!userId) {
        //     return response.error(res, 400, 'User ID is required!');
        // }

        const findPets = await models.pet.findAll({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { '$rejections.user_id$': { [Op.ne]: userId } },
                            { '$rejections.user_id$': null },
                        ]
                    },
                    {
                        [Op.or]: [
                            { '$selections.user_id$': { [Op.ne]: userId } },
                            { '$selections.user_id$': null },
                        ]
                    }
                ],
                owner_id: {
                    [Op.ne]: userId
                }
            },
            include: [
                {
                    model: models.rejected_pet,
                    as: 'rejections',
                    required: false
                },
                {
                    model: models.selected_pet,
                    as: 'selections',
                    required: false
                }
            ]
        });

        const carouselItems = [];

        for (let pet of findPets) {
            const user = await models.user.findByPk(pet.owner_id);
            if (!user) continue;

            // Safely parse the pet images
            let images;
            try {
                images = JSON.parse(pet.images);
            } catch (e) {
                console.error("Error parsing pet images:", e);
                images = []; // Default to an empty array or handle accordingly
            }

            // Prepare the carousel item
            let carouselItem = {
                image: images,
                alt: '', // You can customize the alt text here if needed
                title: pet.pet_name, // You can set a title if needed
                age: pet.age,
                description: '', // You can set a description if needed
                data: {
                    owner_id: pet.owner_id,
                    user_name: user.first_name,
                    pet_id: pet.id,
                }
            };

            carouselItems.push(carouselItem);
        }

        const findUser = await models.user.findByPk(userId);
        if (!findUser) {
            return res.redirect('/'); // Redirect to sign-in page if user doesn't exist
        }

        // Safely parse the user image
        let userProfile;
        try {
            userProfile = JSON.parse(findUser.image)[0];
        } catch (e) {
            userProfile = null; // Default to null or handle accordingly
        }

        res.render('home', {
            title: 'Home',
            first_name: findUser.first_name,
            last_name: findUser.last_name,
            userProfile: userProfile,
            dogImages: carouselItems,
            carouselItems
        });
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
};




const products = async (req, res) => {
    try {

        const userId = req.session.current_user;
        console.log(userId);

        // const userId = req.query.user_id;
        if (!userId) {
            return res.status(400).send('User ID is required');
        }

        // Fetch products and user data concurrently
        const [findProducts, user] = await Promise.all([
            models.product.findAll({
                where: {
                    user_id: {
                        [Op.ne]: userId
                    }
                }
            }),
            models.user.findByPk(userId)
        ]);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Map over products to prepare carousel items
        const carouselItems = await Promise.all(findProducts.map(async (product) => {
            // Safely parse the product images
            let images;
            try {
                images = JSON.parse(product.images);
            } catch (e) {
                console.error("Error parsing product images:", e);
                images = []; // Default to an empty array or handle accordingly
            }

            const findFavourite = await models.favourite.findOne({
                where: {
                    product_id: product.id,
                    user_id: userId
                }
            });

            if (findFavourite) {
                var data = {
                    user_id: product.user_id,
                    user_name: product.created_by ? product.created_by.first_name : 'Unknown',
                    product_id: product.id,
                    is_favourite: findFavourite.is_favourite
                }
            } else {
                var data = {
                    user_id: product.user_id,
                    user_name: product.created_by ? product.created_by.first_name : 'Unknown',
                    product_id: product.id,
                    is_favourite: false
                }
            }


            // Prepare the carousel item
            let carouselItem = {
                image: images,
                alt: '', // You can customize the alt text here if needed
                price: product.item_price,
                title: product.product_title,
                location: product.location,
                data
            };

            return carouselItem;
        }));

        // Safely parse the user profile image
        let userProfile;
        try {
            userProfile = JSON.parse(user.image)[0];
        } catch (e) {
            console.error("Error parsing user image:", e);
            userProfile = null; // Default to null or handle accordingly
        }

        // Render the products page
        res.render('products', {
            title: 'Products',
            first_name: user.first_name,
            last_name: user.last_name,
            userProfile: userProfile,
            recommendations: carouselItems
        });
    } catch (error) {
        console.error("Error occurred:", error.message, error.stack);
        return res.status(500).send('Internal server error');
    }
}



const feed = async (req, res) => {
    try {
        const currentId = req.session.current_user;

        const findPosts = await models.post.findAll({
            order: [['id', 'desc']]
        });

        const postData = await Promise.all(findPosts.map(async post => {
            const user = await models.user.findByPk(post.user_id);
            const time = await timeAgo(post.createdAt);
            const postLike = await models.post_like.findOne({
                where: {
                    post_id: post.id,
                    user_id: currentId
                }
            });
            if (postLike) {
                var liked = postLike.is_like;
            } else {
                var liked = false;
            }

            const likeCounts = await models.post_like.count({
                where: {
                    post_id: post.id,
                    is_like: true
                }
            });
            const pet = await models.pet.findOne({
                where: {
                    owner_id: user.id
                }
            });
            if (pet) {
                var userPartner = pet.pet_name;
            } else {
                var userPartner = '';
            }

            const savedPost = await models.saved_post.findOne({
                where: {
                    user_id: currentId,
                    post_id: post.id
                }
            });

            if (savedPost) {
                var is_saved = savedPost.is_saved;
            } else {
                var is_saved = false
            }

            let userIcon = null;
            let image = null;

            if (user.image) {
                const userImageArray = JSON.parse(user.image);
                if (userImageArray.length > 0) {
                    userIcon = userImageArray[0];
                }
            }

            if (post.images) {
                const postImageArray = JSON.parse(post.images);
                if (postImageArray.length > 0) {
                    image = postImageArray[0];
                }
            }

            const currentUser = await models.user.findByPk(currentId);
            if (currentUser) {
                var current_user_name = currentUser.first_name;
            } else {
                var current_user_name = '';
            }

            return {
                userIcon,
                userName: user.first_name,
                userPartner,
                time,
                location: post.location,
                image,
                description: post.description,
                liked,
                likes: likeCounts,
                comments: 0,
                post_id: post.id,
                current_user: currentId,
                post_owner: post.user_id,
                current_user_name,
                is_saved
            };
        }));

        res.render('feed', { title: 'Feed', feedItems: postData });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'Internal server error!' });
    }
}

const createProduct = async (req, res) => {
    try {
        const priceOptions = [
            { value: '10', text: '10 USD' },
            { value: '20', text: '20 USD' },
            { value: '30', text: '30 USD' }
        ];

        // Render the EJS page with dynamic data
        res.render('createProduct', { title: 'Create product', priceOptions });
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const createPost = async (req, res) => {
    try {
        const priceOptions = [
            { value: '10', text: '10 USD' },
            { value: '20', text: '20 USD' },
            { value: '30', text: '30 USD' }
        ];

        // Render the EJS page with dynamic data
        res.render('createPost', { title: 'Create post', priceOptions });
    } catch (error) {
        return response.error(res, 500, 'Internal server error!');
    }
}

const productDetails = async (req, res) => {
    const productId = req.query.product_id;
    const findProduct = await models.product.findByPk(productId);

    const post = {
        id: findProduct.id,
        images: JSON.parse(findProduct.images),
        user_id: findProduct.user_id,
        price: findProduct.item_price,
        title: findProduct.product_title,
        location: findProduct.location,
        date: findProduct.created_at,
        brand: findProduct.brand,
        size: findProduct.size,
        color: findProduct.color,
        condition: findProduct.product_condition,
        description: findProduct.description
    };

    res.render('productDetails', { title: 'Product details', post: post, backUrl: `/products` });
}





module.exports = {
    signin,
    sendOtp,
    verifyOtp,
    createPet,
    createOwner,
    home,
    products,
    feed,
    createProduct,
    productDetails,
    createPost
}
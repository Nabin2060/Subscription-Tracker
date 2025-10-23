import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    name: {
        type: String,
        required: [true, "subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 70
    },
    price: {
        type: Number,
        required: [true, "subscription price is required"],
        min: [0, "subscription price can't be negative"]
    },
    currency: {
        type: String,
        enum: ["NPR", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"],
        default: "NPR"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["sports", "news", "entertainment", "technology", "finance", "education", "politics", "others"],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"]
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value < new Date(),
            message: "Start date must be in the past"
        },
    },
    renewDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Renew date must be after start date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }
}, { timestamps: true });

// auto calculate renew date if missing
subscriptionSchema.pre("save", function (next) {
    if (!this.renewDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewDate = new Date(this.startDate);
        this.renewDate.setDate(this.renewDate.getDate() + renewalPeriods[this.frequency]);
    }
    // auto-update the status if renew date is past
    if (this.renewDate < new Date()) {
        this.status = "expired";
    }
    next();

});

const subscription = mongoose.model("subscription", subscriptionSchema);

export default subscription;
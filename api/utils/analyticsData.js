import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,  // it groups all documents together
        totalSales: { $sum: 1 },  // if we want to count the total number of sales, we can use $sum: 1, 1 is trued value
        totalRevenue: { $sum: "$totalPrice" }
      }
    }
  ]);

  const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue
  }

};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalPrice" }

        },
      },
      { $sort: { _id: 1 } }, // sort by date ascending order

    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);

      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0
      }
    });

  } catch (error) {
    throw error;
  }

};

// function to get all dates between two dates
function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
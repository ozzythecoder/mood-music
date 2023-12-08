const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://sjohnamson:nBnJJBi1TF4FWa5I@moodmusiccluster.9p8vq5c.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  // try {
  //     // Connect to the MongoDB cluster
  //     await client.connect();

  //     // Make the appropriate DB calls

  //     // Create a single new listing
  //     await createListing(client,
  //         {
  //             name: "Lovely Loft",
  //             summary: "A charming loft in Paris",
  //             bedrooms: 1,
  //             bathrooms: 1
  //         }
  //     );

  //     // Create 3 new listings
  //     await createMultipleListings(client, [
  //         {
  //             name: "Infinite Views",
  //             summary: "Modern home with infinite views from the infinity pool",
  //             property_type: "House",
  //             bedrooms: 5,
  //             bathrooms: 4.5,
  //             beds: 5
  //         },
  //         {
  //             name: "Private room in London",
  //             property_type: "Apartment",
  //             bedrooms: 1,
  //             bathroom: 1
  //         },
  //         {
  //             name: "Beautiful Beach House",
  //             summary: "Enjoy relaxed beach living in this house with a private beach",
  //             bedrooms: 4,
  //             bathrooms: 2.5,
  //             beds: 7,
  //             last_review: new Date()
  //         }
  //     ]);
  // } finally {
  //     // Close the connection to the MongoDB cluster
  //     await client.close();
  // }

//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     // Make the appropriate DB calls

//     // Search for a listing by name
//     await findOneListingByName(client, "Infinite Views");
//   } finally {
//     // Close the connection to the MongoDB cluster
//     await client.close();
//   }

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls

    // Search for recent results with minimum bed and bath rooms
    await findAllListingsByRooms(client, {
        minimumNumberOfBedrooms: 4,
        minimumNumberOfBathrooms: 2,
        maximumNumberOfResults: 5
    });
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }

//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     // Make the appropriate DB calls

//     // Search for recent results with minimum bed and bath rooms
//     await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });
//   } finally {
//     // Close the connection to the MongoDB cluster
//     await client.close();
//   }
}

main().catch(console.error);

/**
 * Create a new Airbnb listing
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object} newListing The new listing to be added
 */
async function createListing(client, newListing) {
  // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

/**
 * Create multiple Airbnb listings
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object[]} newListings The new listings to be added
 */
async function createMultipleListings(client, newListings) {
  // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany for the insertMany() docs
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);

  console.log(
    `${result.insertedCount} new listing(s) created with the following id(s):`
  );
  console.log(result.insertedIds);
}

/**
 * Find  a specific airBNB listing
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object} nameOfListing Name of listing to find
 */

async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameOfListing });

  if (result) {
    console.log(
      `Found a listing in the collection with the name '${nameOfListing}':`
    );
    console.log(result);
  } else {
    console.log(`No listing found with the name: ${nameOfListing}`);
  }
}

async function findAllListingsByRooms(
  client,
  {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER,
  } = {}
) {
  const cursor = client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find({
      bedrooms: { $gte: minimumNumberOfBedrooms },
      bathrooms: { $gte: minimumNumberOfBathrooms },
    })
    .sort({ last_review: -1 })
    .limit(maximumNumberOfResults);

  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
    results.forEach((result, i) => {
        let date = new Date(result.last_review).toDateString();

        console.log();
        console.log(`${i + 1}. name: ${result.name}`);
        console.log(`   _id: ${result._id}`);
        console.log(`   bedrooms: ${result.bedrooms}`);
        console.log(`   bathrooms: ${result.bathrooms}`);
        console.log(`   most recent review date: ${date}`);
    });
} else {
    console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
}

}

async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

class ProductItem {
  final String title;
  final String url;
  final String price;
  final String image;
  final String rating;
  final String from;
  final List? reviews;

  ProductItem({
    required this.title,
    required this.url,
    required this.price,
    required this.image,
    required this.rating,
    required this.from,
    this.reviews,
  });
    factory ProductItem.fromJson(Map<String, dynamic> json) {
    return ProductItem(
      url: json['url'],
      from: json['from'],
      image: json['image'],
      price: json['price'],
      title: json['title'],
      rating: json['rating'],
      reviews: json['reviews'],
    );
  }
}

class Favorite {
  Favorite({
    required this.watchlist,
  });
  late final List<Watchlist> watchlist;
  
  Favorite.fromJson(Map<String, dynamic> json){
    watchlist = List.from(json['watchlist']).map((e)=>Watchlist.fromJson(e)).toList();
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['watchlist'] = watchlist.map((e)=>e.toJson()).toList();
    return _data;
  }
}

class Watchlist {
  Watchlist({
    required this.url,
    required this.from,
    required this.image,
    required this.price,
    required this.title,
    required this.rating,
  });
  late final String url;
  late final String from;
  late final String image;
  late final String price;
  late final String title;
  late final String rating;
  
  Watchlist.fromJson(Map<String, dynamic> json){
    url = json['url'];
    from = json['from'];
    image = json['image'];
    price = json['price'];
    title = json['title'];
    rating = json['rating'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['url'] = url;
    _data['from'] = from;
    _data['image'] = image;
    _data['price'] = price;
    _data['title'] = title;
    _data['rating'] = rating;
    return _data;
  }
}
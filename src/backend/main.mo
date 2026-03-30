import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Int "mo:core/Int";



actor {
  public type Donut = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
  };

  module Donut {
    public func compareByName(donut1 : Donut, donut2 : Donut) : Order.Order {
      Text.compare(donut1.name, donut2.name);
    };
  };

  public type OrderItem = {
    donutId : Nat;
    quantity : Nat;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    items : [OrderItem];
    timestamp : Int;
  };

  let donuts : Map.Map<Nat, Donut> = Map.fromIter<Nat, Donut>(
    [
      {
        id = 1;
        name = "Classic Glazed";
        description = "A timeless favorite with a sweet glaze.";
        price = 80;
        category = "Classic";
        imageUrl = "https://example.com/images/classic-glazed.jpg";
      },
      {
        id = 2;
        name = "Chocolate Frosted";
        description = "Rich chocolate topping on a fluffy donut.";
        price = 299;
        category = "Glazed";
        imageUrl = "https://example.com/images/chocolate-frosted.jpg";
      },
      {
        id = 3;
        name = "Strawberry Sprinkles";
        description = "Pink strawberry icing with colorful sprinkles.";
        price = 279;
        category = "Glazed";
        imageUrl = "https://example.com/images/strawberry-sprinkles.jpg";
      },
      {
        id = 4;
        name = "Pineapple Glazed";
        description = "Light and sweet pineapple glaze over a soft ring donut with a tropical finish.";
        price = 349;
        category = "Specialty";
        imageUrl = "https://example.com/images/pineapple-frosting.jpg";
      },
      {
        id = 5;
        name = "Boston Cream";
        description = "Filled with creamy custard and chocolate icing.";
        price = 120;
        category = "Specialty";
        imageUrl = "https://example.com/images/boston-cream.jpg";
      },
      {
        id = 6;
        name = "Old Fashioned";
        description = "Classic cake donut with a crispy texture.";
        price = 259;
        category = "Classic";
        imageUrl = "https://example.com/images/old-fashioned.jpg";
      },
    ].values().map(
      func(c) {
        (c.id, c);
      }
    )
  );

  let orders = Map.empty<Nat, Order>();
  var orderIdCounter = 1;

  public shared ({ caller }) func placeOrder(customerName : Text, customerEmail : Text, customerPhone : Text, untypedItems : [(donutId : Nat, quantity : Nat)]) : async Nat {
    let orderId = orderIdCounter;
    orderIdCounter += 1;

    let items : [OrderItem] = untypedItems.map(
      func((donutId, quantity)) {
        { donutId; quantity };
      }
    );

    let newOrder : Order = {
      id = orderId;
      customerName;
      customerEmail;
      customerPhone;
      items;
      timestamp = Time.now();
    };
    orders.add(orderId, newOrder);
    orderId;
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    let ordersArray = orders.values().toArray();
    ordersArray.sort(
      func(a, b) {
        Int.compare(b.timestamp, a.timestamp);
      }
    );
  };

  public query ({ caller }) func getOrderById(id : Nat) : async Order {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllDonuts() : async [Donut] {
    donuts.values().toArray().sort(Donut.compareByName);
  };

  public query ({ caller }) func getDonutById(id : Nat) : async Donut {
    switch (donuts.get(id)) {
      case (null) { Runtime.trap("Donut not found") };
      case (?donut) { donut };
    };
  };

  public query ({ caller }) func getDonutsByCategory(category : Text) : async [Donut] {
    donuts.values().toArray().filter(func(donut) { donut.category == category });
  };

  public query ({ caller }) func searchDonuts(searchTerm : Text) : async [Donut] {
    donuts.values().toArray().filter(
      func(donut) {
        donut.name.contains(#text(searchTerm)) or donut.description.contains(#text(searchTerm));
      }
    );
  };
};

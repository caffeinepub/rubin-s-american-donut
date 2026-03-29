import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useGetAllOrders } from "../hooks/useQueries";

const ADMIN_PASSWORD = "rubin2024";

// Static name map matching all items sold in the store
const ITEM_NAME_MAP: Record<string, string> = {
  "1": "Strawberry Dream",
  "2": "Midnight Chocolate",
  "3": "Classic Glazed",
  "5": "Milk Chocolate Bliss",
  "7": "White Chocolate Dream",
  "8": "Pineapple Glazed",
  "101": "Party Donut Box (24 Donuts)",
  "102": "Party Donut Box (50 Donuts)",
  "103": "Mini Donut Party Pack (50 pcs)",
  "104": "Mini Donut Party Pack (100 pcs)",
  "201": "Donut Cake Tower – 12 Donuts",
  "202": "Donut Cake Tower – 18 Donuts",
  "203": "Donut Cake Tower – 24 Donuts",
  "204": "Donut Cake Tower – 45 Donuts",
};

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onAuth();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-xl border-pink-100">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-3">
            <div className="bg-pink-500 text-white rounded-full p-3">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Admin Access
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">Rubin's American Donut</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                data-ocid="admin.input"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="border-pink-200 focus:border-pink-500 focus:ring-pink-500"
              />
              {error && (
                <p
                  data-ocid="admin.error_state"
                  className="text-red-500 text-sm mt-1"
                >
                  {error}
                </p>
              )}
            </div>
            <Button
              data-ocid="admin.submit_button"
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const {
    data: orders = [],
    isLoading,
    refetch,
    isFetching,
  } = useGetAllOrders();

  if (!isAuthed) {
    return <PasswordGate onAuth={() => setIsAuthed(true)} />;
  }

  const sortedOrders = [...orders].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );

  const now = Date.now();

  function isNew(timestamp: bigint) {
    const orderTime = Number(timestamp / 1_000_000n);
    return now - orderTime < 60 * 60 * 1000;
  }

  function formatDate(timestamp: bigint) {
    return new Date(Number(timestamp / 1_000_000n)).toLocaleString();
  }

  function getItemName(donutId: bigint): string {
    const key = String(donutId);
    return ITEM_NAME_MAP[key] ?? `Item #${key}`;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-pink-500 text-white px-6 py-4 flex items-center justify-between shadow">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Admin Panel — Orders
          </h1>
          <p className="text-pink-100 text-sm">Rubin's American Donut</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            data-ocid="admin.secondary_button"
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-pink-600 bg-transparent"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`w-4 h-4 mr-1 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            data-ocid="admin.cancel_button"
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-pink-600 bg-transparent"
            onClick={() => setIsAuthed(false)}
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="mb-6">
          <Card className="border-pink-100">
            <CardContent className="py-4 flex items-center gap-4">
              <div className="bg-pink-50 rounded-lg px-5 py-3 text-center">
                <p className="text-3xl font-bold text-pink-500">
                  {orders.length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Total Orders</p>
              </div>
              <div className="bg-pink-50 rounded-lg px-5 py-3 text-center">
                <p className="text-3xl font-bold text-pink-500">
                  {orders.filter((o) => isNew(o.timestamp)).length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">New (last 1hr)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders */}
        {isLoading ? (
          <div
            data-ocid="admin.loading_state"
            className="flex justify-center py-20"
          >
            <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          </div>
        ) : sortedOrders.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="text-center py-20 text-gray-400"
          >
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm mt-1">
              Orders will appear here once customers start placing them.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order, idx) => (
              <Card
                key={String(order.id)}
                data-ocid={`admin.item.${idx + 1}`}
                className="border-pink-100 shadow-sm"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base font-semibold text-gray-800">
                        Order #{String(order.id)}
                      </CardTitle>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDate(order.timestamp)}
                      </p>
                    </div>
                    {isNew(order.timestamp) && (
                      <Badge className="bg-pink-500 text-white text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Customer
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customerEmail}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customerPhone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Items
                      </p>
                      <ul className="space-y-0.5">
                        {order.items.map((item) => (
                          <li
                            key={String(item.donutId)}
                            className="text-sm text-gray-700"
                          >
                            {getItemName(item.donutId)} &times;{" "}
                            {String(item.quantity)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

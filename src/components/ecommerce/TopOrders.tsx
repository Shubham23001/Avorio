import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

// Define the TypeScript interface for the table rows
interface TopProduct {
  id: number;
  name: string;
  sold: number;
  image: string;
}

// Sample data for top products
const topProducts: TopProduct[] = [
  {
    id: 1,
    name: "T-shirt",
    sold: 200,
    image: "/images/product/product-06.jpg",
  },
  {
    id: 2,
    name: "Jeans",
    sold: 150,
    image: "/images/product/product-07.jpg",
  },
  {
    id: 3,
    name: "Sneakers",
    sold: 120,
    image: "/images/product/product-08.jpg",
  },
];

export default function TopOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top Products
        </h3>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">#</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Product</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Sold</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {topProducts.map((product, idx) => (
              <TableRow key={product.id}>
                <TableCell className="py-3">{idx + 1}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-md">
                      <img src={product.image} className="h-[40px] w-[40px]" alt={product.name} />
                    </div>
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 font-bold text-gray-900 dark:text-white/90">{product.sold}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

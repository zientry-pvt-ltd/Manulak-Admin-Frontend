import { useForm } from "react-hook-form";

import { Form, FormDescription } from "@/components/ui/form";
import SearchBar from "@/components/ui/custom/SearchBar";
import CheckBoxFilter from "@/components/ui/custom/CheckBoxFilter";
import stockData from "./api/stockData";
import DynamicTable from "@/components/ui/custom/DynamicTable";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import DynamicBreadCrumb from "@/components/ui/custom/DynamicBreadCrumb";

interface StockFromValues {
  items: string[];
}

interface StockRecord {
  "No.": number;
  "Item": string;
  "Description": string;
  "Quantity": number;
  "Unit Price (Rs.)": number;
  "Discount (Rs.)": number;
  "Net Amount (Rs.)": number;
}

const items = [
  {
    id: "lorry",
    label: "Lorry",
  },
  {
    id: "warehouse",
    label: "Warehouse",
  },
] as const;

const tableColumns = ["No.",	"Item",	"Descritpion",	"Quantity",	"Unit price (Rs.)",	"Discount (Rs.)",	"Net amount (Rs.)"];

const tableRecords: StockRecord[] = stockData;

const updatedDate = "08/06/2025";

export default function StockFeature() {
  const form = useForm<StockFromValues>({
    defaultValues: {
      items: ["lorry", "warehouse"],
    },
  });

  const onFilterChange = () => {}
  
  return (
    <div>
      <DynamicBreadCrumb breadCrumbPaths={[{'path':'/stocks', 'name':'Stock'}]} />
      <div className="py-8 px-16 bg-background rounded-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFilterChange)} className="flex flex-col content-between">
            <div>
              <div className="flex flex-row mb-4">
                <SearchBar />
              </div>
              <div className="flex flex-row justify-between mb-8">
                <CheckBoxFilter
                  control={form.control}
                  name="items"
                  items={items}
                  description="Display items in:"
                />
                <FormDescription className='select-none'><span>Last updated date: {updatedDate}</span></FormDescription>
              </div>
              <DynamicTable columns={tableColumns} records={tableRecords} />
            </div>
            <Separator className="mt-16 mb-4" />
            <Pagination className="justify-center sm:justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </form>
        </Form>
      </div>
    </div>
  );
}

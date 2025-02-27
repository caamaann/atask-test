import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormSchema } from "@/types/api";

interface ISearchForm {
  form: UseFormReturn<FormSchema>;
  onSubmit: (values: FormSchema) => void;
  isLoading: boolean;
}

export default function SearchForm({ form, onSubmit, isLoading }: ISearchForm) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:flex md:gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="md:w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full mt-4 md:w-fit md:mt-8"
          loading={isLoading}
        >
          Search
        </Button>
      </form>
    </Form>
  );
}

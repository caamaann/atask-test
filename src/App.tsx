import { Fragment, useState } from "react";
import Navbar from "./components/navbar";
import SearchForm from "./components/search-form";
import { useForm } from "react-hook-form";
import { apiSearchUser, apiSearchUserRepository } from "./lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { FormSchema } from "./types/api";
import { formSchema } from "./lib/schema";
import SearchList from "./components/search-list";
import { AxiosError } from "axios";
import { toast } from "sonner";

function App() {
  const [state, setState] = useState({
    q: "",
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { data, isFetching } = useQuery({
    queryKey: ["search", state.q],
    queryFn: async () => {
      try {
        const res = await apiSearchUser({ q: state.q, per_page: 5 });
        const results = await Promise.all(
          res.items.map(async (user) => {
            const repository = await apiSearchUserRepository(user.login, {
              per_page: 999,
            });
            return {
              ...user,
              repository,
            };
          })
        );
        return results;
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("An error occurred");
        }
      }
    },
    enabled: !!state.q,
  });

  function onSubmit(value: FormSchema) {
    setState({ q: value.username });
  }

  return (
    <Fragment>
      <Navbar />
      <main className="container py-6 max-w-screen-md">
        <SearchForm form={form} onSubmit={onSubmit} isLoading={isFetching} />
        {state.q ? (
          <p className="my-4 text-gray-500">Showing users for "{state.q}"</p>
        ) : null}
        <SearchList data={data ?? []} isLoading={isFetching} />
      </main>
    </Fragment>
  );
}

export default App;

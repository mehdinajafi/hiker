import Divider from "@/components/ui/Divider";
import SwitchRow from "./SwitchRow";
import CheckboxRow from "./CheckboxRow";
import { getCategories } from "@/api/queries/category";

const Filters = async () => {
  const categories = await getCategories();
  const categoriesOptions = categories.data.map((category) => ({
    value: category.id,
    title: category.name,
  }));

  return (
    <div className="">
      <CheckboxRow
        filter={{
          key: "category",
          title: "Categories",
          options: categoriesOptions,
        }}
      />

      <Divider />

      <SwitchRow filter={{ key: "inStock", title: "Only available items" }} />
    </div>
  );
};

export default Filters;

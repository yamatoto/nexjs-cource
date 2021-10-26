import { useRouter } from "next/router";

const FilteredEventsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <h1>Filtered Events {slug}</h1>
    </div>
  );
};

export default FilteredEventsPage;

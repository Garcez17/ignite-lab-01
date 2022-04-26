import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next"
import { useGetProductsQuery } from "../../graphql/generated/graphql";
import { withApollo } from "../../lib/withApollo";

function Home() {
  const { user } = useUser();
  const { data } = useGetProductsQuery();

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    return {
      props: {}
    }
  }
});

export default withApollo(Home);

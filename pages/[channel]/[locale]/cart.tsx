import Link from "next/link";
import React, { ReactElement } from "react";

import { CartSummary, CheckoutLineItem, Layout, Spinner } from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { usePaths } from "@/lib/paths";
import { useCheckoutWithToken } from "@/lib/providers/CheckoutWithTokenProvider";

const Cart = () => {
  const paths = usePaths();
  const { loading, checkoutError, checkout, checkoutToken } =
    useCheckoutWithToken();

  if (loading) {
    return <Spinner />;
  }
  if (checkoutError) return <p>Error</p>;

  const products = checkout?.lines || [];

  return (
    <>
      <BaseSeo title="Cart - Saleor Tutorial" />

      <div className="py-10">
        <header className="mb-4">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Your Cart
              </h1>
              <div>
                <Link href={paths.$url()}>
                  <a className="text-sm ">Continue Shopping</a>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-8">
            <section className="col-span-2">
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((line) => (
                  <li key={line?.id} className="flex py-6">
                    {line && checkoutToken && <CheckoutLineItem line={line} />}
                  </li>
                ))}
              </ul>
            </section>

            {!!checkout && (
              <div>
                <CartSummary checkout={checkout} />
                <div className="mt-12">
                  <Link href={paths.checkout.$url()}>
                    <a className="block w-full bg-blue-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-center font-medium text-white hover:bg-blue-700">
                      Checkout
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;

Cart.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

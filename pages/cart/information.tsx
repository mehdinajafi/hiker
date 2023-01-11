import Head from "next/head";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import clsx from "clsx";
import PageHeader from "@/components/PageHeader";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import CheckoutLayout from "@/components/CartPage/CheckoutLayout";
import useStore from "@/store";
import sendRequest from "@/utils/sendRequest";
import { ICart } from "@/interfaces";
import ChevronLeftIcon from "@/public/icons/chevron-left.svg";
import OrderSummery from "@/components/CartPage/OrderSummery";

const validationSchema = yup.object({
  emailOrPhoneNumber: yup
    .string()
    .required("Email or mobile phone number is required."),
  country: yup.string().required("Country is required."),
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required."),
  address: yup.string().required("Address is required."),
  address2: yup.string(),
  city: yup.string().required("City is required."),
  province: yup.string().required("Province is required."),
  postalCode: yup.string().required("Postal code is required."),
});

const CheckoutPage = () => {
  const cartId = useStore((store) => store.cart.id);
  const router = useRouter();

  const { data, mutate } = useSWR<{ cart: ICart }>(
    cartId ? `/api/cart?cartId=${cartId}` : null
  );

  const information = data && data.cart.information;

  const { trigger } = useSWRMutation("/api/checkout/save", sendRequest, {
    onSuccess: (data) => {
      mutate(data, { revalidate: false });
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: information || {
      emailOrPhoneNumber: "",
      country: "Canada",
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      city: "",
      province: "Tehran",
      postalCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await trigger({ cartId, information: values });
        router.push("/cart/shipping");
      } catch (error) {
        toast.error("Something went wrong. try again.");
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Information - MNTN</title>
      </Head>

      <main className="container mb-20">
        <PageHeader>
          <PageHeader.Title>Information</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Link>Home</PageHeader.Link>
            <PageHeader.Link href="/cart">Cart</PageHeader.Link>
            <PageHeader.Link disabled>Information</PageHeader.Link>
          </PageHeader.Breadcrumbs>
        </PageHeader>

        <CheckoutLayout
          orderSummery={
            <OrderSummery
              hideShippingCost
              items={data?.cart.items}
              shippingCost={data?.cart.shippingCost}
              subTotalPrice={data?.cart.subTotalPrice}
              totalPrice={data?.cart.totalPrice}
            />
          }
        >
          <form onSubmit={formik.handleSubmit}>
            <fieldset>
              <legend className="font-semibold">Contact information</legend>
              <div className="mt-4">
                <TextField
                  label="Email or mobile phone number"
                  id="contact-info"
                  name="emailOrPhoneNumber"
                  value={formik.values.emailOrPhoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.emailOrPhoneNumber &&
                    Boolean(formik.errors.emailOrPhoneNumber)
                  }
                  helperText={
                    formik.touched.emailOrPhoneNumber &&
                    formik.errors.emailOrPhoneNumber
                  }
                />
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="font-semibold">Shipping address</legend>
              <div className="mt-4 grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-6">
                  <TextField
                    label="First name"
                    id="first-name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <TextField
                    label="Last name"
                    id="last-name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </div>

                <div className="col-span-12">
                  <TextField
                    label="Address"
                    id="shipping_address_address1"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </div>

                <div className="col-span-12">
                  <TextField
                    label="Apartment, suite, etc. (optional)"
                    id="shipping_address_address2"
                    name="address2"
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address2 && Boolean(formik.errors.address2)
                    }
                    helperText={
                      formik.touched.address2 && formik.errors.address2
                    }
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <TextField
                    select
                    label="Country/region"
                    id="country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={formik.touched.country && formik.errors.country}
                  >
                    <option value="Iran">Iran</option>
                    <option value="Canada">Canada</option>
                  </TextField>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <TextField
                    select
                    label="Province"
                    id="shipping_address_province"
                    name="province"
                    value={formik.values.province}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.province && Boolean(formik.errors.province)
                    }
                    helperText={
                      formik.touched.province && formik.errors.province
                    }
                  >
                    <option value="Tehran">Tehran</option>
                    <option value="Qazvin">Qazvin</option>
                  </TextField>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <TextField
                    label="City"
                    id="shipping_address_city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </div>

                <div className="col-span-12">
                  <TextField
                    label="Postal code"
                    id="shipping_address_postal_code"
                    name="postalCode"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.postalCode &&
                      Boolean(formik.errors.postalCode)
                    }
                    helperText={
                      formik.touched.postalCode && formik.errors.postalCode
                    }
                  />
                </div>
              </div>
            </fieldset>

            <div
              className={clsx(
                "mt-8 flex flex-col justify-between space-y-6",
                "sm:flex-row-reverse sm:items-center sm:space-y-0"
              )}
            >
              <Button
                type="submit"
                color="primary"
                disabled={formik.isSubmitting}
              >
                Continue to shipping
              </Button>

              <Button
                type="button"
                startIcon={<ChevronLeftIcon />}
                variant="text"
                href="/cart"
              >
                Return to cart
              </Button>
            </div>
          </form>
        </CheckoutLayout>
      </main>
    </>
  );
};

export default CheckoutPage;

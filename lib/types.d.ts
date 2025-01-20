/**
 * Prop type for navigation
 */
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  icon: Icon;
};

/**
 * Prop type for header
 */
type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

/**
 * Represents a general schema.
 *
 * An array of objects, each containing a key and its corresponding ValidationType.
 */
type GeneralSchema = {
  key: string;
  value: ValidationType;
  required?: boolean;
};

/**
 * Validation types
 *
 * These can be extended
 * * See instructions in @/lib/validation/index.ts
 */
type ValidationType =
  | "phone"
  | "email"
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "url"
  | "zip_code";



/**
 * Represents a log message.
 *
 * This type can have two possible shapes:
 * - If the log message is successfully parsed, it will have a shape defined by the `SafeParseReturnType` type.
 * - If the log message is not successfully parsed, it will have a shape of `{ success: string }`.
 */
type LogMessage =
  | z.SafeParseReturnType<
      {
        [x: string]: any;
      },
      {
        [x: string]: any;
      }
    >
  | { success: string };

/**
 * Represents a function that handles server actions.
 *
 * @param formData - The form data to be processed by the server action.
 * @returns A promise that resolves to an object containing an error message, or undefined if there is no error.
 */
type ServerActionFunction = (
  formData: FormData
) => Promise<{ error: string } | undefined>;



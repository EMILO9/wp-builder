import { z } from "zod";

export type HeaderType = {
  /**
   * The name of your plugin.
   * *Displayed in the Plugin management screen.*
   * @example "My Awesome Plugin"
   */
  pluginName: string;
  /**
   * The home page of the plugin.
   * Should be a unique URL, preferably on your own website.
   */
  pluginURI?: string;
  /**
   * A short description of the plugin (under 140 characters).
   * *Displayed in the Plugin management screen.*
   */
  description?: string;
  /**
   * The current version number of the plugin.
   * @example "1.6.3"
   * @default "1.0.0"
   */
  version: string;
  /**
   * The lowest WordPress version that the plugin will work on.
   * @example "6.0"
   */
  requiresAtLeast?: string;
  /**
   * The minimum required PHP version.
   * @example "7.4"
   */
  requiresPHP?: string;
  /**
   * List of plugin authors.
   */
  author: string[];
  /**
   * The author's website or profile URL.
   */
  authorURI?: string;
  /**
   * The license name (e.g., GPLv2 or later).
   */
  license?: string;
  /**
   * The URL to the full text of the license.
   */
  licenseURI?: string;
  /**
   * The gettext text domain for translation strings.
   */
  textDomain?: string;
  /**
   * The path to the directory containing the translations (.mo files).
   */
  domainPath?: string;
  /**
   * Whether the plugin can only be activated network-wide in Multisite.
   */
  network?: true;
  /**
   * A custom URL for plugin updates, bypassing WordPress.org.
   */
  updateURI?: string;
  /**
   * Slugs of other plugins required for this plugin to function.
   * @example ["woocommerce", "elementor"]
   */
  requiresPlugins: string[];
};

export const HeaderSchema: z.ZodType<
  HeaderType,
  Pick<HeaderType, "pluginName"> & Partial<Omit<HeaderType, "pluginName">>
> = z.object({
  pluginName: z.string().trim().nonempty(),
  pluginURI: z.url().optional(),
  description: z.string().trim().nonempty().max(140).optional(),
  version: z.string().trim().nonempty().default("1.0.0"),
  requiresAtLeast: z.string().trim().nonempty().optional(),
  requiresPHP: z.string().trim().nonempty().optional(),
  author: z.array(z.string().trim().nonempty()).default([]),
  authorURI: z.url().optional(),
  license: z.string().trim().nonempty().optional(),
  licenseURI: z.url().optional(),
  textDomain: z.string().trim().nonempty().optional(),
  domainPath: z.string().trim().nonempty().optional(),
  network: z.literal(true).optional(),
  updateURI: z.url().optional(),
  requiresPlugins: z.array(z.string().trim().nonempty()).default([]),
});

export type ConfigInput = z.input<typeof HeaderSchema>;
export type ConfigOutput = z.output<typeof HeaderSchema>;

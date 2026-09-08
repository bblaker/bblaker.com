import Callout from './Callout.astro';
import Term from './Term.astro';
import Spec from './Spec.astro';
import BOM from './BOM.astro';

/**
 * Passed to <Content components={mdxComponents} /> so post bodies can use
 * these without importing them in every file.
 */
export const mdxComponents = { Callout, Term, Spec, BOM };

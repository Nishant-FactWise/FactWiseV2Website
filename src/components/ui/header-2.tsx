'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { MagicButton } from '@/components/ui/MagicButton';
import { useScroll } from '@/components/ui/use-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ArrowUpRight,
	BriefcaseBusiness,
	Building2,
	ChevronDown,
	Home,
	Layers3,
	Newspaper,
	Truck,
	type LucideIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getPathLocale, localizePath, stripLocale } from '@/lib/i18n';
import { localizeTerminology } from '@/lib/localized-terminology';
import { messages } from '@/lib/messages';

type NavLink = {
	label: string;
	href: string;
	icon: LucideIcon;
	subLinks?: { label: string; href: string }[];
};

export function Header({ theme: propTheme = 'dark' }: { theme?: 'light' | 'dark' }) {
	const pathname = usePathname();
	const locale = getPathLocale(pathname);
	const cleanPathname = stripLocale(pathname);
	const textMap = messages[locale].textMap;
	const t = (source: string) => localizeTerminology(textMap[source] ?? source, locale);
	// Pages with white/light backgrounds need dark nav text from the start
	const LIGHT_PAGES = ['/pricing', '/platform', '/demo', '/careers/jobs', '/privacy-policy', '/terms-of-service', '/dpdp-compliance', '/cookie-policy', '/faq', '/documentation'];
	const isLightPage = LIGHT_PAGES.some(p => cleanPathname === p || cleanPathname.startsWith(p + '/'));
	const theme = isLightPage ? 'light' : propTheme;
	const [open, setOpen] = React.useState(false);
	const [expandedMobileMenu, setExpandedMobileMenu] = React.useState<string | null>(null);
	const [mounted, setMounted] = React.useState(false);
	const scrolled = useScroll(cleanPathname === '/' ? () => (typeof window !== 'undefined' ? window.innerHeight : 800) : 20);

	// Dropdown hover-intent: keeps the menu open as the cursor crosses the
	// invisible gap between the trigger and the panel. Pure CSS group-hover
	// closes the moment the cursor leaves the trigger rect — on slower
	// machines / Windows Edge that gap is unforgiving and the menu flickers
	// or refuses to open. JS-driven state with a short close-delay is robust.
	const [openMenu, setOpenMenu] = useState<number | null>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const openDropdown = useCallback((i: number) => {
		if (closeTimer.current) {
			clearTimeout(closeTimer.current);
			closeTimer.current = null;
		}
		setOpenMenu(i);
	}, []);
	const scheduleClose = useCallback(() => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
	}, []);
	useEffect(() => () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
	}, []);

	React.useEffect(() => {
		const frame = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(frame);
	}, []);

	const links: NavLink[] = [
		{
			label: t('Home'),
			href: '/',
			icon: Home,
		},
		{
			label: t('Product'),
			href: '/inquiry-to-quote',
			icon: Layers3,
			subLinks: [
				{ label: t('Inquiry to Quote'), href: '/inquiry-to-quote' },
				{ label: t('Requisitions to PO'), href: '/requisitions-to-po' },
				{ label: t('Invoice to Pay'), href: '/invoice-to-pay' },
			]
		},
		{
			label: t('Suppliers'),
			href: '/supplier',
			icon: Truck,
		},
		{
			label: t('Blog'),
			href: '/blog',
			icon: Newspaper,
		},
		{
			label: t('About Us'),
			href: '/about',
			icon: Building2,
		},
		{
			label: t('Careers'),
			href: '/careers',
			icon: BriefcaseBusiness,
		},
	].filter((link) => locale === 'en' || link.href !== '/blog');

	const isLinkActive = (link: NavLink) => {
		if (link.href === '/') return cleanPathname === '/';
		if (cleanPathname === link.href || cleanPathname.startsWith(link.href + '/')) return true;
		if (link.subLinks) {
			return link.subLinks.some(s => cleanPathname === s.href || cleanPathname.startsWith(s.href + '/'));
		}
		return false;
	};

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	React.useEffect(() => {
		if (!open) return;

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', closeOnEscape);
		return () => window.removeEventListener('keydown', closeOnEscape);
	}, [open]);

	if (
		cleanPathname === '/demo' || 
		cleanPathname === '/supplier-onboarding' || 
		cleanPathname?.startsWith('/supplier-onboarding') ||
		cleanPathname?.startsWith('/supplier onboarding')
	) {
		return null;
	}

	return (
		<header
			style={open ? { height: '100dvh' } : undefined}
			className={cn(
				'fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] mx-auto',
				{
					'opacity-0': !mounted,
					'opacity-100': mounted,
					// Initial (All pages): Transparent, full width, visible on page load
					'top-0 bg-transparent py-4 border border-transparent w-full md:max-w-[1800px] scale-100': !scrolled && !open,
					// Scrolled (Pill mode): pops out/down with border & backdrop-blur, leaves space on left/right on mobile
					'top-3 md:top-4 rounded-2xl border border-black/[0.1] shadow-[0_30px_60px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl py-1 opacity-100 translate-y-0 scale-[1.02] w-[calc(100%-2rem)] md:w-full md:max-w-7xl': scrolled && !open,
					// Mobile Open state
					'top-0 h-dvh w-full rounded-none border-transparent bg-white opacity-100 translate-y-0 scale-100': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-300',
					{
						'md:px-8': scrolled,
					},
				)}
			>
				<Link href={localizePath("/", locale)} className="flex items-center gap-3 cursor-pointer">
					<Image
						src={(scrolled || open || !mounted || theme === 'light') ? "/logo.webp" : "/logowhite.webp"}
						alt="FactWise Logo"
						width={32}
						height={32}
						className="h-8 w-8 shrink-0 transition-all duration-300"
						priority
					/>
					<span className={cn("text-[17px] font-bold tracking-tight transition-colors duration-300", {
						"text-white": !scrolled && !open && mounted && theme === 'dark',
						"text-black": scrolled || open || !mounted || theme === 'light',
					})}>FactWise</span>
				</Link>

				<div className="hidden items-center gap-1 md:flex">
					{links.map((link, i) => {
						const darkMode = !scrolled && !open && theme === 'dark';
						const active = isLinkActive(link);
						const isOpen = openMenu === i;
						const linkClass = cn(
							'relative transition-colors duration-300 flex items-center gap-1.5 text-[14px] font-medium cursor-pointer',
							darkMode
								? active ? 'text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
								: active ? 'text-black' : 'text-black/60 hover:text-black hover:bg-black/5',
						);
						const underline = (
							<span
								className={cn(
									'pointer-events-none absolute bottom-[3px] left-3 right-3 h-[2px] rounded-full origin-center transition-transform duration-300 ease-out',
									darkMode ? 'bg-white' : 'bg-[#3666ff]',
									active || (link.subLinks && isOpen) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
								)}
							/>
						);
						return (
							<div
								key={i}
								className="relative group"
								onMouseEnter={link.subLinks ? () => openDropdown(i) : undefined}
								onMouseLeave={link.subLinks ? scheduleClose : undefined}
							>
								{link.subLinks ? (
									<Link
										className={buttonVariants({ variant: 'ghost', className: linkClass })}
										href={localizePath(link.href, locale)}
										onFocus={() => openDropdown(i)}
									>
										{link.label}
										<ChevronDown size={14} className={cn('transition-transform opacity-50', isOpen && 'rotate-180')} />
										{underline}
									</Link>
								) : (
									<Link
										className={buttonVariants({ variant: 'ghost', className: linkClass })}
										href={localizePath(link.href, locale)}
									>
										{link.label}
										{underline}
									</Link>
								)}

								{link.subLinks && (
									<div
										className={cn(
											'absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200',
											isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none',
										)}
									>
										<div className="w-64 bg-white border border-black/[0.08] rounded-2xl p-2 shadow-xl">
											{link.subLinks.map((sub, j) => {
												const subActive = cleanPathname === sub.href || cleanPathname.startsWith(sub.href + '/');
												return (
													<Link
														key={j}
														href={localizePath(sub.href, locale)}
														className={cn(
															'block px-4 py-3 rounded-xl text-sm transition-colors',
															subActive
																? 'bg-[#3666ff]/[0.08] text-[#3666ff] font-semibold'
																: 'text-black/60 hover:bg-black/[0.04] hover:text-black',
														)}
													>
														{sub.label}
													</Link>
												);
											})}
										</div>
									</div>
								)}
							</div>
						);
					})}
					<div className={cn("w-px h-4 mx-4 transition-colors duration-300", {
						"bg-white/20": !scrolled && !open && theme === 'dark',
						"bg-black/10": scrolled || open || theme === 'light',
					})} />
					{(() => {
						const darkMode = !scrolled && !open && theme === 'dark';
						const loginClass = cn(
							'relative transition-colors duration-300 flex items-center text-[14px] font-medium cursor-pointer',
							darkMode
								? 'text-white/80 hover:text-white hover:bg-white/10'
								: 'text-black/60 hover:text-black hover:bg-black/5',
						);
						return (
							<div className="relative group">
								<a
									href="https://apps.factwise.io/?showBackButton=true"
									className={buttonVariants({ variant: 'ghost', className: loginClass })}
								>
									{t('Login')}
									<span
										className={cn(
											'pointer-events-none absolute bottom-[3px] left-3 right-3 h-[2px] rounded-full origin-center transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100',
											darkMode ? 'bg-white' : 'bg-[#3666ff]',
										)}
									/>
								</a>
							</div>
						);
					})()}
					<div className={cn("w-px h-4 mx-1 transition-colors duration-300", {
						"bg-white/20": !scrolled && !open && theme === 'dark',
						"bg-black/10": scrolled || open || theme === 'light',
					})} />
					<div className="mx-1">
						<LanguageSwitcher
							triggerClassName={
								!scrolled && !open && theme === 'dark'
									? 'text-white/85 hover:text-white'
									: 'text-black/60 hover:text-[#3666ff]'
							}
						/>
					</div>
					<MagicButton
						label1={t('Request Demo')}
						label2={t('Join Us')}
						className="scale-[0.85] origin-right ml-3"
						onClick={() => window.location.assign(localizePath('/demo', locale))}
					/>
				</div>
			<Button size="icon" variant="ghost" aria-label={t('Toggle Navigation Menu')} aria-expanded={open} onClick={() => {
				if (open) setExpandedMobileMenu(null);
				setOpen(!open);
			}} className={cn("md:hidden rounded-full border transition-all duration-300 active:scale-90", {
					// Glassy chip so the menu button stays clearly visible over the hero
					// from the start (not just a bare white icon lost in the image).
					"text-white bg-white/15 border-white/25 backdrop-blur-md hover:bg-white/25": !scrolled && !open && theme === 'dark',
					"text-black bg-black/5 border-black/10 hover:bg-black/10": scrolled || open || theme === 'light',
				})}>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
 
			{/* Mobile Menu */}
			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						key="mobile-navigation"
						aria-label="Mobile navigation"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
						className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-[#f8faff]/95 backdrop-blur-2xl md:hidden"
					>
						<div className="pointer-events-none absolute -left-24 top-4 h-72 w-72 rounded-full bg-[#3666ff]/[0.08] blur-3xl" />
						<div className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#7c9aff]/10 blur-3xl" />

						<div
							className="relative mx-auto flex h-full w-full max-w-lg flex-col px-4 pt-5"
							style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
						>
							<motion.div
								initial="hidden"
								animate="visible"
								variants={{
									hidden: {},
									visible: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
								}}
								className="space-y-1 rounded-2xl bg-white/80 p-2"
								style={{ boxShadow: '0 16px 45px rgba(40,65,120,0.08), inset 0 0 0 1px rgba(148,163,184,0.18)' }}
							>
								{links.map((link) => {
									const active = isLinkActive(link);
									const expanded = expandedMobileMenu === link.label;
									const Icon = link.icon;
									const rowClass = cn(
										'group flex min-h-13 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[16px] font-semibold transition-[background-color,color,transform] duration-200 active:scale-[0.985]',
										active || expanded
											? 'bg-[#3666ff]/[0.08] text-[#2855e7]'
											: 'text-slate-800 hover:bg-slate-100/80 hover:text-[#2855e7]',
									);

									return (
										<motion.div
											key={link.label}
											variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
											transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
										>
											{link.subLinks ? (
												<button
													type="button"
													onClick={() => setExpandedMobileMenu(expanded ? null : link.label)}
													className={rowClass}
													aria-expanded={expanded}
												>
													<span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200', active || expanded ? 'border-[#3666ff]/20 bg-white text-[#3666ff] shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-[#3666ff]/20 group-hover:bg-white group-hover:text-[#3666ff]')}>
														<Icon className="size-[17px]" strokeWidth={1.8} />
													</span>
													<span className="flex-1">{link.label}</span>
													<ChevronDown className={cn('size-4 text-slate-400 transition-transform duration-300', expanded && 'rotate-180 text-[#3666ff]')} />
												</button>
											) : (
												<Link
													className={rowClass}
													href={localizePath(link.href, locale)}
													onClick={() => {
														setExpandedMobileMenu(null);
														setOpen(false);
													}}
												>
													<span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200', active ? 'border-[#3666ff]/20 bg-white text-[#3666ff] shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-[#3666ff]/20 group-hover:bg-white group-hover:text-[#3666ff]')}>
														<Icon className="size-[17px]" strokeWidth={1.8} />
													</span>
													<span className="flex-1">{link.label}</span>
													<ArrowUpRight className="size-4 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#3666ff] group-hover:opacity-100" />
												</Link>
											)}

											<AnimatePresence initial={false}>
												{link.subLinks && expanded && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: 'auto', opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
														className="overflow-hidden"
													>
														<div className="mb-2 ml-12 mt-1 grid gap-1 border-l border-[#3666ff]/20 pl-3">
															{link.subLinks.map((sub) => {
																const subActive = cleanPathname === sub.href || cleanPathname.startsWith(sub.href + '/');
																return (
																	<Link
																		key={sub.label}
																		href={localizePath(sub.href, locale)}
																		className={cn('rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all duration-200 active:scale-[0.985]', subActive ? 'bg-[#3666ff]/[0.08] text-[#3666ff]' : 'text-slate-600 hover:bg-white hover:text-[#3666ff]')}
																		onClick={() => {
																			setExpandedMobileMenu(null);
																			setOpen(false);
																		}}
																	>
																		{sub.label}
																	</Link>
																);
															})}
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</motion.div>
									);
								})}
							</motion.div>

							<div className="relative mt-auto pt-5">
								<div className="mb-3 flex min-h-12 items-center justify-between rounded-xl border border-slate-200/80 bg-white/75 px-3.5 shadow-sm">
									<span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{locale}</span>
									<LanguageSwitcher triggerClassName="text-slate-700 hover:text-[#3666ff]" />
								</div>
								<div className="grid gap-2.5">
									<button
										onClick={() => { window.location.href = 'https://apps.factwise.io/?showBackButton=true'; }}
										className="h-12 w-full rounded-xl border border-slate-200 bg-white text-[15px] font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.985]"
									>
										{t('Login')}
									</button>
									<button
										onClick={() => { window.location.assign(localizePath('/demo', locale)); }}
										className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#3666ff] text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(54,102,255,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2855e7] hover:shadow-[0_14px_30px_rgba(54,102,255,0.3)] active:translate-y-0 active:scale-[0.985]"
									>
										{t('Request Demo')}
										<ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

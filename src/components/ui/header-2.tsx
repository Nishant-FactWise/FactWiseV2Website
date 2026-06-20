'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { ShimmerButton } from '@/components/ui/ShimmerButton';
import { MagicButton } from '@/components/ui/MagicButton';
import { useScroll } from '@/components/ui/use-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export function Header({ theme: propTheme = 'dark' }: { theme?: 'light' | 'dark' }) {
	const pathname = usePathname();
	// Pages with white/light backgrounds need dark nav text from the start
	const LIGHT_PAGES = ['/pricing', '/platform', '/demo', '/careers/jobs', '/privacy-policy', '/terms-of-service', '/cookie-policy', '/faq', '/documentation'];
	const isLightPage = LIGHT_PAGES.some(p => pathname === p || pathname.startsWith(p + '/'));
	const theme = isLightPage ? 'light' : propTheme;
	const [open, setOpen] = React.useState(false);
	const [expandedMobileMenu, setExpandedMobileMenu] = React.useState<string | null>('Product');
	const [mounted, setMounted] = React.useState(false);
	const scrolled = useScroll(pathname === '/' ? () => (typeof window !== 'undefined' ? window.innerHeight : 800) : 20);

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
		setMounted(true);
	}, []);

	const links = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Product',
			href: '#',
			subLinks: [
				{ label: 'Inquiry to Quote', href: '/inquiry-to-quote' },
				{ label: 'Requisitions to PO', href: '/requisitions-to-po' },
				{ label: 'Invoice to Pay', href: '/invoice-to-pay' },
			]
		},
		{
			label: 'Blog',
			href: '/blog',
		},
		{
			label: 'About Us',
			href: '/about',
		},
		{
			label: 'Careers',
			href: '/careers',
		},
	];

	const isLinkActive = (link: { href: string; subLinks?: { href: string }[] }) => {
		if (link.href === '/') return pathname === '/';
		if (pathname === link.href || pathname.startsWith(link.href + '/')) return true;
		if (link.subLinks) {
			return link.subLinks.some(s => pathname === s.href || pathname.startsWith(s.href + '/'));
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

	if (pathname === '/demo') {
		return null;
	}

	const isLandingPage = pathname === '/';

	return (
		<header
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
					'top-0 w-full h-full bg-white border-transparent opacity-100 translate-y-0 scale-100 rounded-none': open,
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
				<Link href="/" className="flex items-center gap-3 cursor-pointer">
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
										href={link.href}
										onFocus={() => openDropdown(i)}
									>
										{link.label}
										<ChevronDown size={14} className={cn('transition-transform opacity-50', isOpen && 'rotate-180')} />
										{underline}
									</Link>
								) : (
									<Link
										className={buttonVariants({ variant: 'ghost', className: linkClass })}
										href={link.href}
									>
										{link.label}
										{underline}
									</Link>
								)}

								{(link as any).subLinks && (
									<div
										className={cn(
											'absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200',
											isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none',
										)}
									>
										<div className="w-64 bg-white border border-black/[0.08] rounded-2xl p-2 shadow-xl">
											{(link as any).subLinks.map((sub: any, j: number) => {
												const subActive = pathname === sub.href || pathname.startsWith(sub.href + '/');
												return (
													<Link
														key={j}
														href={sub.href}
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
									Login
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
					<MagicButton
						label1="Request Demo"
						label2="Join Us"
						className="scale-[0.85] origin-right ml-2"
						onClick={() => window.location.href = '/demo'}
					/>
				</div>
				<Button size="icon" variant="ghost" aria-label="Toggle Navigation Menu" aria-expanded={open} onClick={() => setOpen(!open)} className={cn("md:hidden rounded-full border transition-colors duration-300", {
					// Glassy chip so the menu button stays clearly visible over the hero
					// from the start (not just a bare white icon lost in the image).
					"text-white bg-white/15 border-white/25 backdrop-blur-md hover:bg-white/25": !scrolled && !open && theme === 'dark',
					"text-black bg-black/5 border-black/10 hover:bg-black/10": scrolled || open || theme === 'light',
				})}>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
 
			{/* Mobile Menu */}
			<div
				className={cn(
					'fixed top-16 right-0 bottom-0 left-0 z-50 flex flex-col overflow-y-auto bg-[#f6f9fc]/98 backdrop-blur-xl border-t border-black/[0.08] md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				{/* Background Gradients */}
				<div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3666ff]/10 blur-[100px] pointer-events-none" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#3666ff]/15 blur-[100px] pointer-events-none" />
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'flex h-full w-full flex-col justify-between gap-y-2 p-6',
					)}
				>
					<div className="grid gap-y-3">
						{links.map((link) => {
							const active = isLinkActive(link);
							return (
							<div key={link.label} className="flex flex-col gap-1 z-10 relative">
								{link.subLinks ? (
									<button 
										onClick={() => setExpandedMobileMenu(expandedMobileMenu === link.label ? null : link.label)}
										className={cn('text-xl font-medium flex items-center justify-between py-1.5 transition-colors active:scale-[0.98]', active ? 'text-[#3666ff]' : 'text-slate-800 hover:text-[#3666ff]')}
									>
										{link.label}
										<ChevronDown size={20} className={cn("transition-transform duration-300 text-slate-400", expandedMobileMenu === link.label ? "rotate-180" : "")} />
									</button>
								) : (
									<Link
										className={cn('text-xl font-medium py-1.5 transition-colors active:scale-[0.98]', active ? 'text-[#3666ff] font-semibold' : 'text-slate-800 hover:text-[#3666ff]')}
										href={link.href}
										onClick={() => setOpen(false)}
									>
										{link.label}
									</Link>
								)}
								{link.subLinks && (
									<AnimatePresence>
										{expandedMobileMenu === link.label && (
											<motion.div 
												initial={{ height: 0, opacity: 0 }} 
												animate={{ height: 'auto', opacity: 1 }} 
												exit={{ height: 0, opacity: 0 }} 
												className="overflow-hidden"
											>
												<div className="flex flex-col gap-2.5 ml-3 mb-3 mt-1 border-l-2 border-slate-200 pl-4">
													{(link as any).subLinks.map((sub: any) => {
														const subActive = pathname === sub.href || pathname.startsWith(sub.href + '/');
														return (
														<Link
															key={sub.label}
															href={sub.href}
															className={cn('text-base transition-colors active:scale-[0.98]', subActive ? 'text-[#3666ff] font-semibold' : 'text-slate-600 hover:text-[#3666ff]')}
															onClick={() => setOpen(false)}
														>
															{sub.label}
														</Link>
														);
													})}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								)}
							</div>
							);
						})}
					</div>
					<div className="flex flex-col gap-4 pt-8 pb-10 border-t border-black/[0.07] mt-auto z-10 relative">
						<button 
							onClick={() => { window.location.href = 'https://apps.factwise.io/?showBackButton=true'; }} 
							className="w-full h-14 text-lg font-medium text-slate-800 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all"
						>
							Login
						</button>
						<button 
							onClick={() => { window.location.href = '/demo'; }} 
							className="w-full h-14 text-lg font-bold text-white bg-[#3666ff] rounded-xl shadow-[0_0_20px_rgba(54,102,255,0.2)] hover:bg-[#3666ff]/90 hover:shadow-lg hover:shadow-[#3666ff]/30 active:scale-[0.98] transition-all"
						>
							Request Demo
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

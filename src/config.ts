import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Eyeofflame643",
	subtitle: "记录折腾与生活",
	lang: "zh_CN", // 语言代码，例如 'en', 'zh_CN', 'ja' 等；决定界面文字语言
	themeColor: {
		hue: 160, // 主题色相：0-360。红 0、橙 30、薄荷绿 160、天青 250、粉 345
		fixed: false, // true = 隐藏访客的主题色切换按钮，固定用上面这个 hue
	},
	banner: {
		enable: true,
		src: "assets/images/demo-banner.png", // 相对 /src 的路径；以 / 开头则相对 /public
		position: "center", // 只支持 'top' | 'center' | 'bottom'
		credit: {
			enable: false, // 是否显示横幅图片的版权信息
			text: "", // 版权文字
			url: "", // （可选）原图/作者链接
		},
	},
	toc: {
		enable: true, // 文章右侧显示目录
		depth: 2, // 目录最大标题层级，1-3
	},
	favicon: [
		// 留空数组则使用默认图标
		// {
		//   src: '/favicon/icon.png',    // 相对 /public 的路径
		//   theme: 'light',              // （可选）'light' 或 'dark'
		//   sizes: '32x32',              // （可选）图标尺寸
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/Eyeofflame643", // 内部链接不要带 base 路径，会自动拼接
			external: true, // 显示外链图标，并在新标签页打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png", // 相对 /src 的路径；以 / 开头则相对 /public
	name: "Eyeofflame643",
	bio: "在折腾中慢慢变强。",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github", // 图标代码可在 https://icones.js.org/ 查询
			// 如果用的图标集没装，需要先 `pnpm add @iconify-json/<icon-set-name>`
			url: "https://github.com/Eyeofflame643",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：背景色等样式在 astro.config.mjs 里被覆盖了，见该文件。
	// 请选择暗色主题，因为本博客目前只支持暗色代码块背景
	theme: "github-dark",
};

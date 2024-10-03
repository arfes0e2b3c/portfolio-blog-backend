import { sql } from 'drizzle-orm'
import { SeedDb } from '.'
import { articlesTable, categoriesTable } from '../db/schema'

export const seedArticles = async () => {
	const categories = await SeedDb.select().from(categoriesTable)

	if (categories.length === 0) {
		throw new Error('Categories must be seeded first.')
	}

	const articlesData = [
		{
			title: 'Reactの最新機能について',
			content: 'Reactの最新機能とその使い方について紹介します。',
			draftContent: 'Reactの最新機能の草稿です。',
			eyecatch: 'https://example.com/image1.png',
			category: categories.find((cat) => cat.name === 'フロントエンド')?.id,
			isPublished: true,
			publishedAt: new Date(),
		},
		{
			title: 'フロントエンドエンジニアに求められるスキル',
			content: 'フロントエンドエンジニアに必要なスキルセットを解説します。',
			draftContent: 'スキルセットの草稿です。',
			eyecatch: 'https://example.com/image2.png',
			category: categories.find((cat) => cat.name === 'フロントエンド')?.id,
			isPublished: true,
			publishedAt: new Date(),
		},
		{
			title: '初めてのインターン体験',
			content: '私の初めてのインターン経験についてお話しします。',
			draftContent: 'インターン体験の草稿です。',
			eyecatch: 'https://example.com/image3.png',
			category: categories.find((cat) => cat.name === 'インターン')?.id,
			isPublished: false,
		},
		{
			title: 'インターンシップの成功の秘訣',
			content: 'インターンシップで成功するための秘訣を紹介します。',
			draftContent: '成功の秘訣の草稿です。',
			eyecatch: 'https://example.com/image4.png',
			category: categories.find((cat) => cat.name === 'インターン')?.id,
			isPublished: true,
			publishedAt: new Date(),
		},
		{
			title: '就活でのポートフォリオ作成のポイント',
			content: '就活で効果的なポートフォリオの作り方について。',
			draftContent: 'ポートフォリオの草稿です。',
			eyecatch: 'https://example.com/image5.png',
			category: categories.find((cat) => cat.name === '就活')?.id,
			isPublished: false,
		},
		{
			title: '効果的な面接対策',
			content: '就活の面接対策方法を解説します。',
			draftContent: '面接対策の草稿です。',
			eyecatch: 'https://example.com/image6.png',
			category: categories.find((cat) => cat.name === '就活')?.id,
			isPublished: true,
			publishedAt: new Date(),
		},
		{
			title: '仕事でのストレス管理方法',
			content: '職場でのストレスをうまく管理する方法について。',
			draftContent: 'ストレス管理の草稿です。',
			eyecatch: 'https://example.com/image7.png',
			category: categories.find((cat) => cat.name === '仕事')?.id,
			isPublished: true,
			publishedAt: new Date(),
		},
		{
			title: 'リモートワーク時の生産性向上のコツ',
			content: 'リモートワークを効果的にするための方法について解説します。',
			draftContent: '生産性向上の草稿です。',
			eyecatch: 'https://example.com/image8.png',
			category: categories.find((cat) => cat.name === '仕事')?.id,
			isPublished: false,
		},
		{
			title: '趣味を仕事にする方法',
			content: '趣味を仕事に変えるためのステップを紹介します。',
			draftContent: '趣味と仕事に関する草稿です。',
			eyecatch: 'https://example.com/image9.png',
			category: categories.find((cat) => cat.name === 'その他')?.id,
			isPublished: true,
			publishedAt: new Date(),
		},
		{
			title: '健康的なライフスタイルを維持するコツ',
			content: '健康的な生活習慣を続けるためのポイント。',
			draftContent: '健康に関する草稿です。',
			eyecatch: 'https://example.com/image10.png',
			category: categories.find((cat) => cat.name === 'その他')?.id,
			isPublished: false,
		},
	]

	await SeedDb.insert(articlesTable)
		.values(articlesData)
		.onConflictDoUpdate({
			target: articlesTable.id,
			set: {
				title: sql`${articlesTable.title}`,
				updatedAt: sql`${articlesTable.updatedAt}`,
			},
		})

	console.log('Articles seeded.')
}

import { AxiosInstance } from "axios";

interface config {
	baseURL: string;
	anime: (target: string) => string;
	episode: (eps: string) => string;
	"list-anime": "a-z";
	letters: string[];
	batch: "daftar-batch",
	batchPage: (page: number) => string;
	season: string;
	search: (anime: string) => string;
	searchPage: (page: number, anime: string) => string;
	genre: (genre: string) => string;
}

interface ListData {
	title: string;
	url: string;
	image: string;
	shortDesc: string;
}

interface Genre {
	name: string;
	url: string;
}

interface BatchData {
	title: string;
	url: string;
	image: string;
	rating_score: number;
	type: string;
	batch: string;
	genres: Genre[];
	seen: number;
}

interface SearchData {
	title: string;
	url: string;
	image: string;
	rating_score: number;
	type: string;
	category: string;
	genres: Genre[];
	seen: number;
}

interface SearchPageData {
	page: number;
	data: SearchData[];
}

interface BatchPageData {
	page: number;
	data: BatchData[];
}

interface GetData {
	title: string;
	description: string;
	image: string;
	rating: number;
	genres: Genre[];
}

interface PopularData {
	name: string;
	url: string;
}

interface GetGenreData extends BatchPageData {}

declare class Samehada {
	constructor();
	public request: AxiosInstance;
	public config: config;

	private init(): void;
	
	// functions
	public list(letter: string): Promise<ListData[]>;
	public batch(): Promise<BatchPageData[]>;
	public search(anime: string): Promise<SearchPageData[]>;
	public popular(): Promise<PopularData[]>;
	public get(url: string): Promise<GetData[]>;
	public getGenre(genre: string): Promise<GetGenreData[]>;
}
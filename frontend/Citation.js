
export default class Citation{
  constructor({
    citation_id,
    type,
    title,
    subtitle,
    publication_name,
    url,
    publication_year,
    accessed_year
  }){
    this.id = citation_id,
    this.type = type,
    this.title = title,
    this.subtitle = subtitle;
    this.publication_name = publication_name,
    this.publication_year = publication_year,
    this.url = url,
    this.accessed_year = accessed_year;

    return this.displayCitation();
  }

  displayCitation(){
  const dom = document.createElement("article");
  dom.id = this.id;

  dom.innerHTML = `
    <p>
      ${this.publicationYear(this.publication_year)}
      ${this.publicationTitle(this.title, this.subtitle)}
      ${this.publicationName(this.publication_name)}
      ${this.publicationUrl(this.url)}
    </p>
  `;

    return dom;
  }

  publicationYear(year){
    return this.span('year', '('+year+').')
  }

  publicationTitle(title, subtitle){
    const content = `
      ${title}${subtitle ?  ": " + subtitle: ""}.
    `
    return this.span('title', content)
  }

  publicationUrl(url){
    return url ? `<a href="${url}"> ${url}. </a>` : "";
  }

  publicationName(name){
    return this.i('publication-name', name);
  }

  accessed(year){
    return this.span('accessed', year)
  }

  span(cls, content){
    return `<span class='${cls}'>${content}</span>`
  }

  i(cls, content){
    return `<i class='${cls}'>${content}</i>`
  }
}
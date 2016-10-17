using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace GeoMapx.Web.Models
{
    public class HttpGeoMessage : HttpResponseMessage
    {
        public object PayLoad { get; set; }
        //public object XHeaders { get; set; }
        //public string json 
        //{
        //    get 
        //    {
        //        HttpGeoMessage temp = new HttpGeoMessage 
        //        {
        //            PayLoad = this.PayLoad,
        //            Content = this.Content,
        //            XHeaders = this.Headers,
        //            ReasonPhrase = this.ReasonPhrase,
        //            RequestMessage = this.RequestMessage,
        //            StatusCode = this.StatusCode,
        //            Version = this.Version
        //        };
        //        return JsonConvert.SerializeObject(temp);
        //    } 
        //}
    }
}
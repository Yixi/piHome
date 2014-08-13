<?php
/**
 * Created by PhpStorm.
 * User: yixi
 * Date: 8/13/14
 * Time: 11:37
 */

namespace Home\Controller;

use Think\Controller;
use Think\Log;

class ApiController extends Controller{
    public function index(){

        $cmd = I('param.cmd');

        switch($cmd){
            case 'create':
                $this ->createData();
                break;
            case 'getdata':
                $this ->getData();
                break;
        }

    }

    public function getData(){
        $Temperature = D('Temperature');
        $type = I('param.type');
        if(!$type || $type == 'all'){
            $data = $Temperature->order('time asc')->select();
        }else{
            $data = $Temperature->where("type='{$type}'")->order('time asc')->select();
        }

        $this->ajaxReturn($data);
    }

    public function createData(){
        $Temperature = D('Temperature');
        $data['type'] = I('param.type');
        $data['value'] =I('param.value');
        $data['time'] = I('param.time');

        $id = $Temperature->add($data);
//        $id = $Temperature->add($data);
        $result = M('Temperature')->find($id);

        $this->ajaxReturn($result);
//        $this->display("Index:index");
    }
} 